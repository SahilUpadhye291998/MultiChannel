#!/bin/bash

source scriptUtils.sh

function clearContainers() {
  CONTAINER_IDS=$(docker ps -a | awk '($2 ~ /dev-peer.*/) {print $1}')
  if [ -z "$CONTAINER_IDS" -o "$CONTAINER_IDS" == " " ]; then
    echo "---- No containers available for deletion ----"
  else
    docker rm -f $CONTAINER_IDS
  fi
}

function removeUnwantedImages() {
  DOCKER_IMAGE_IDS=$(docker images | awk '($1 ~ /dev-peer.*/) {print $3}')
  if [ -z "$DOCKER_IMAGE_IDS" -o "$DOCKER_IMAGE_IDS" == " " ]; then
    echo "---- No images available for deletion ----"
  else
    docker rmi -f $DOCKER_IMAGE_IDS
  fi
}

function generateCerts(){
  which cryptogen
  if [ "$?" -ne 0 ]; then
      echo "cryptogen tool not found. exiting"
      exit 1
  fi
  echo
  echo "##########################################################"
  echo "##### Generate certificates using cryptogen tool #########"
  echo "##########################################################"

  if [ -d "crypto-config" ]; then
      rm -Rf crypto-config
  fi
  set -x
  cryptogen generate --config=./crypto-config.yaml
  res=$?
  set +x
  if [ $res -ne 0 ]; then
      echo "Failed to generate certificates..."
      exit 1
  fi
  echo
  echo "Generate CCP files for Org1 and Org2 and Org3"
  ./ccp-generate.sh
}

function generateGenesis(){
  echo "##########################################################"
  echo "#########  Generating Orderer Genesis block ##############"
  echo "##########################################################"
  # Note: For some unknown reason (at least for now) the block file can't be
  # named orderer.genesis.block or the orderer will fail to launch!
  echo "CONSENSUS_TYPE="$CONSENSUS_TYPE
  set -x
  if [ "$CONSENSUS_TYPE" == "solo" ]; then
    configtxgen -profile FourOrgsOrdererGenesis -channelID $SYS_CHANNEL -outputBlock ./channel-artifacts/genesis.block
  else
    set +x
    echo "unrecognized CONSESUS_TYPE='$CONSENSUS_TYPE'. exiting"
    exit 1
  fi
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate orderer genesis block..."
    exit 1
  fi
}

function generateChannel(){
  echo
  echo "###############################################################################"
  echo "### Generating channel configuration transaction 'supplierfarmerchannel.tx' ###"
  echo "###############################################################################"
  set -x
  configtxgen -profile SupplierFarmerChannel -outputCreateChannelTx ./channel-artifacts/supplierfarmerchannel.tx -channelID $CHANNEL_NAME_SUPPLIER_FARMER
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate channel configuration transaction..."
    exit 1
  fi

  echo
  echo "###############################################################################"
  echo "### Generating channel configuration transaction 'suppliercustomerchannel.tx' ###"
  echo "###############################################################################"
  set -x
  configtxgen -profile SupplierCustomerChannel -outputCreateChannelTx ./channel-artifacts/suppliercustomerchannel.tx -channelID $CHANNEL_NAME_SUPPLIER_CUSTOMER
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate channel configuration transaction..."
    exit 1
  fi

  echo
  echo "###############################################################################"
  echo "### Generating channel configuration transaction 'logisticschannel.tx' ###"
  echo "###############################################################################"
  set -x
  configtxgen -profile LogisticsToAllChannel -outputCreateChannelTx ./channel-artifacts/logisticschannel.tx -channelID $CHANNEL_NAME_LOGISTICS
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate channel configuration transaction..."
    exit 1
  fi
}

function updateAnchorBlock(){
  echo
  echo "#################################################################"
  echo "#######    Generating anchor peer update for Org1MSP   ##########"
  echo "#################################################################"
  set -x
  configtxgen -profile SupplierFarmerChannel -outputAnchorPeersUpdate ./channel-artifacts/Org1MSPanchors.tx -channelID $CHANNEL_NAME_SUPPLIER_FARMER -asOrg Org1MSP
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate anchor peer update for Org1MSP..."
    exit 1
  fi

  echo
  echo "#################################################################"
  echo "#######    Generating anchor peer update for Org2MSP   ##########"
  echo "#################################################################"
  set -x
  configtxgen -profile SupplierFarmerChannel -outputAnchorPeersUpdate ./channel-artifacts/Org2MSPanchors_farmer.tx -channelID $CHANNEL_NAME_SUPPLIER_FARMER -asOrg Org2MSP
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate anchor peer update for Org2MSP..."
    exit 1
  fi

  echo
  echo "###########################################################################"
  echo "#######    Generating anchor peer update for Org2MSP (CUSTOMER)  ##########"
  echo "###########################################################################"
  set -x
  configtxgen -profile SupplierCustomerChannel -outputAnchorPeersUpdate ./channel-artifacts/Org2MSPanchors_customer.tx -channelID $CHANNEL_NAME_SUPPLIER_CUSTOMER -asOrg Org2MSP
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate anchor peer update for Org2MSP..."
    exit 1
  fi

  echo
  echo
  echo "#################################################################"
  echo "#######    Generating anchor peer update for Org3MSP   ##########"
  echo "#################################################################"
  set -x
  configtxgen -profile SupplierCustomerChannel -outputAnchorPeersUpdate ./channel-artifacts/Org3MSPanchors.tx -channelID $CHANNEL_NAME_SUPPLIER_CUSTOMER -asOrg Org3MSP
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate anchor peer update for Org3MSP..."
    exit 1
  fi
  echo

  echo
  echo
  echo "##########################################################################"
  echo "#######    Generating anchor peer update for Org1MSP (FARMER)   ##########"
  echo "##########################################################################"
  set -x
  configtxgen -profile LogisticsToAllChannel -outputAnchorPeersUpdate ./channel-artifacts/Org1MSPanchors_farmer_logistics.tx -channelID $CHANNEL_NAME_LOGISTICS -asOrg Org1MSP
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate anchor peer update for Org3MSP..."
    exit 1
  fi
  echo

  echo
  echo
  echo "############################################################################"
  echo "#######    Generating anchor peer update for Org2MSP (SUPPLIER)   ##########"
  echo "############################################################################"
  set -x
  configtxgen -profile LogisticsToAllChannel -outputAnchorPeersUpdate ./channel-artifacts/Org2MSPanchors_supplier_logistics.tx -channelID $CHANNEL_NAME_LOGISTICS -asOrg Org2MSP
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate anchor peer update for Org3MSP..."
    exit 1
  fi
  echo

  echo
  echo
  echo "############################################################################"
  echo "#######    Generating anchor peer update for Org3MSP (CUSTOMER)   ##########"
  echo "############################################################################"
  set -x
  configtxgen -profile LogisticsToAllChannel -outputAnchorPeersUpdate ./channel-artifacts/Org3MSPanchors_customer_logistics.tx -channelID $CHANNEL_NAME_LOGISTICS -asOrg Org3MSP
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate anchor peer update for Org3MSP..."
    exit 1
  fi
  echo

  echo
  echo
  echo "#################################################################"
  echo "#######    Generating anchor peer update for Org4MSP   ##########"
  echo "#################################################################"
  set -x
  configtxgen -profile LogisticsToAllChannel -outputAnchorPeersUpdate ./channel-artifacts/Org4MSPanchors.tx -channelID $CHANNEL_NAME_LOGISTICS -asOrg Org4MSP
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate anchor peer update for Org3MSP..."
    exit 1
  fi
  echo
}

function generateChannelArtifacts(){
  which configtxgen
  if [ "$?" -ne 0 ]; then
    echo "configtxgen tool not found. exiting"
    exit 1
  fi

  generateGenesis
  generateChannel
  updateAnchorBlock

}

function networkUp(){
    if [ ! -d "crypto-config" ]; then
        generateCerts
        # replacePrivateKey
        generateChannelArtifacts
    fi
    if [ "${CERTIFICATE_AUTHORITIES}" == "true" ]; then
      export BYFN_CA1_PRIVATE_KEY=$(cd crypto-config/peerOrganizations/org1.example.com/ca && ls *_sk)
      export BYFN_CA2_PRIVATE_KEY=$(cd crypto-config/peerOrganizations/org2.example.com/ca && ls *_sk)
      export BYFN_CA3_PRIVATE_KEY=$(cd crypto-config/peerOrganizations/org3.example.com/ca && ls *_sk)
      export BYFN_CA4_PRIVATE_KEY=$(cd crypto-config/peerOrganizations/org4.example.com/ca && ls *_sk)
      # docker-compose -f docker-compose-e2e.yaml -f docker-compose-couch.yaml -f docker-compose-multi-net.yaml up -d
      docker-compose -f docker-compose-ca.yaml -f docker-compose-couch.yaml -f docker-compose-multi-net.yaml up -d
      docker ps
      # echo "==================================================================="
      # echo "==================================================================="
      # echo "==================================================================="
      # echo "                         Installing chaincode                      "
      # echo "==================================================================="
      # echo "==================================================================="
      # echo "==================================================================="
      docker exec cli_farmer_supplier /bin/sh -c "scripts/network_farmer_supplier.sh"
      docker exec cli_farmer_supplier /bin/sh -c "scripts/network_supplier_farmer.sh"
      # docker exec cli_customer_supplier /bin/sh -c "scripts/network_customer_supplier.sh"
      # docker exec cli_customer_supplier /bin/sh -c "scripts/network_supplier_customer.sh"
      # docker exec cli_logistics /bin/sh -c "scripts/network_logistics.sh"
      # echo "==================================================================="
      # echo "==================================================================="
      # echo "==================================================================="
      # echo "                           Testing chaincode                       "
      # echo "==================================================================="
      # echo "==================================================================="
      # echo "==================================================================="
      # docker exec cli_farmer_supplier /bin/sh -c "scripts/installing_chaincode_network_farmer_supplier.sh"
      # docker exec cli_farmer_supplier /bin/sh -c "scripts/invoke_install_check.sh"
      # docker exec cli /bin/sh -c "scripts/testChainCode_foodManagement_supplier.sh"
      # docker exec cli /bin/sh -c "scripts/testChainCode_foodManagement_farmer.sh"
      # docker exec cli /bin/sh -c "scripts/testChainCode_foodManagement.sh"

    else
      docker-compose -f docker-compose-cli.yaml -f docker-compose-couch.yaml up -d
      docker ps
      docker exec cli /bin/sh -c "scripts/networkUp_insurance.sh"
      docker exec cli /bin/sh -c "scripts/testChaincode_insurance.sh"
    fi
}

function networkDown() {
  docker-compose -f $COMPOSE_FILE  down --volumes --remove-orphans
  rm connection-org*.json
  rm connection-org*.yaml
  if [ "$MODE" != "restart" ]; then
    docker run -v $PWD:/tmp/first-network --rm hyperledger/fabric-tools:$IMAGETAG rm -Rf /tmp/first-network/ledgers-backup
    clearContainers
    removeUnwantedImages
    rm -rf channel-artifacts/*.block channel-artifacts/*.tx crypto-config ./org3-artifacts/crypto-config/ channel-artifacts/org3.json
    rm -f docker-compose-e2e.yaml
    docker volume prune
  fi

}

function replacePrivateKey(){
    # sed on MacOSX does not support -i flag with a null extension. We will use
    # 't' for our back-up's extension and delete it at the end of the function
    ARCH=$(uname -s | grep Darwin)
    if [ "$ARCH" == "Darwin" ]; then
        OPTS="-it"
    else
        OPTS="-i"
    fi

    # Copy the template to the file that will be modified to add the private key
    sudo cp docker-compose-e2e-template.yaml docker-compose-e2e.yaml

    # The next steps will replace the template's contents with the
    # actual values of the private key file names for the two CAs.
    CURRENT_DIR=$PWD
    cd crypto-config/peerOrganizations/org1.example.com/ca/
    PRIV_KEY=$(ls *_sk)
    cd "$CURRENT_DIR"
    sudo sed $OPTS "s/CA1_PRIVATE_KEY/${PRIV_KEY}/g" docker-compose-e2e.yaml
    cd crypto-config/peerOrganizations/org2.example.com/ca/
    PRIV_KEY=$(ls *_sk)
    cd "$CURRENT_DIR"
    sed $OPTS "s/CA2_PRIVATE_KEY/${PRIV_KEY}/g" docker-compose-e2e.yaml
    cd crypto-config/peerOrganizations/org3.example.com/ca/
    PRIV_KEY=$(ls *_sk)
    cd "$CURRENT_DIR"
    sed $OPTS "s/CA3_PRIVATE_KEY/${PRIV_KEY}/g" docker-compose-e2e.yaml
    cd crypto-config/peerOrganizations/org4.example.com/ca/
    PRIV_KEY=$(ls *_sk)
    cd "$CURRENT_DIR"
    sed $OPTS "s/CA4_PRIVATE_KEY/${PRIV_KEY}/g" docker-compose-e2e.yaml

    # If MacOSX, remove the temporary backup of the docker-compose file
    if [ "$ARCH" == "Darwin" ]; then
        rm docker-compose-e2e.yamlt
    fi
}

CONSENSUS_TYPE="solo"
CLI_TIMEOUT=100
CLI_DELAY=30
SYS_CHANNEL="multi-net-channel"
CERTIFICATE_AUTHORITIES=true
CHANNEL_NAME="mychannel"
CHANNEL_NAME_SUPPLIER_FARMER="supplierfarmerchannel"
CHANNEL_NAME_SUPPLIER_CUSTOMER="suppliercustomerchannel"
CHANNEL_NAME_LOGISTICS="logisticschannel"
LANGUAGE=javascript
CRYPTO="cryptogen"
export VERBOSE=true
NO_CHAINCODE=false
COMPOSE_FILE=docker-compose-ca.yaml
COMPOSE_FILE_COUCH=docker-compose-couch.yaml
IF_COUCHDB=couchdb
COMPOSE_FILE_CA=docker-compose-ca.yaml
IMAGETAG="latest"
export $IMAGETAG="latest"
export IMAGE_TAG=latest
export COMPOSE_PROJECT_NAME=blockchain
MODE=$1
shift
if [ "$MODE" == "generate" ]; then
    echo "#################################################################"
    echo "####################    Generate PreReq   #######################"
    echo "#################################################################"
    generateCerts
    # replacePrivateKey
    generateChannelArtifacts
elif [ "$MODE" == "up" ]; then
    networkUp
elif [ "$MODE" == "down" ]; then
    networkDown
else
    echo "Please use generate"
    exit 1
fi
