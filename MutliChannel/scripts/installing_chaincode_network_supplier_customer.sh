#!/bin/sh

echo "************************************************************************"
echo "************************************************************************"
echo "************************Instantiate Chaincode***************************"
echo "************************************************************************"
echo "************************************************************************"

echo "==============================================================="
echo "                          make customer supplier tar gz"
echo "==============================================================="
peer lifecycle chaincode package suppliercustomer.tar.gz --path ../../../chaincode/supplier_customer/node/ --lang node --label suppliercustomer_1.0


export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org2MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
export CORE_PEER_ADDRESS=peer0.org2.example.com:9051

echo "==============================================================="
echo "                          make customer supplier tar gz"
echo "==============================================================="
peer lifecycle chaincode install suppliercustomer.tar.gz --peerAddresses peer0.org2.example.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt

export CORE_PEER_LOCALMSPID="Org3MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt
export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.example.com/users/Admin@org3.example.com/msp
export CORE_PEER_ADDRESS=peer0.org3.example.com:11051

echo "==============================================================="
echo "                          make customer supplier tar gz"
echo "==============================================================="
peer lifecycle chaincode install suppliercustomer.tar.gz --peerAddresses peer0.org3.example.com:11051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt

export CC_PACKAGE_ID=$(peer lifecycle chaincode queryinstalled | grep -n 2 | awk '{print $3}'| awk '{gsub(/,$/,""); print}')

echo "CC_PACKAGE_ID : $CC_PACKAGE_ID"

echo "==============================================================="
echo "                          Approve chaincode"
echo "==============================================================="
peer lifecycle chaincode approveformyorg \
-o orderer.example.com:7050 --ordererTLSHostnameOverride orderer.example.com \
--channelID suppliercustomerchannel --name suppliercustomer --version 1.0 \
--package-id $CC_PACKAGE_ID \
--sequence 1 --tls --init-required \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem


export CORE_PEER_LOCALMSPID="Org2MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
export CORE_PEER_ADDRESS=peer0.org2.example.com:9051

echo "==============================================================="
echo "                          Approve chaincode"
echo "==============================================================="
peer lifecycle chaincode approveformyorg -o \
orderer.example.com:7050 --ordererTLSHostnameOverride orderer.example.com \
--channelID suppliercustomerchannel --name suppliercustomer --version 1.0 \
--package-id $CC_PACKAGE_ID --sequence 1 \
--tls --init-required \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

echo "==============================================================="
echo "                          Commiting Readieness chaincode"
echo "==============================================================="
peer lifecycle chaincode checkcommitreadiness --channelID suppliercustomerchannel --name suppliercustomer --version 1.0 --sequence 1 --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --output json --init-required

echo "==============================================================="
echo "                          Commit"
echo "==============================================================="
peer lifecycle chaincode commit -o orderer.example.com:7050 \
--ordererTLSHostnameOverride orderer.example.com \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
--channelID suppliercustomerchannel --name suppliercustomer \
--version 1.0 --sequence 1 --tls true \
--peerAddresses peer0.org2.example.com:9051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt \
--peerAddresses peer0.org3.example.com:11051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt \
--init-required

echo "==============================================================="
echo "                          Check Query Commitness"
echo "==============================================================="
peer lifecycle chaincode querycommitted --channelID suppliercustomerchannel --name suppliercustomer
