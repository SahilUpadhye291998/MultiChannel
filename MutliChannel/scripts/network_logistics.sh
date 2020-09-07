CRC_SRC_PATH="/opt/gopath/src/github.com/chaincode/logistics/node/"


CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
CORE_PEER_ADDRESS=peer0.org1.example.com:7051
CORE_PEER_LOCALMSPID="Org1MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt

echo "==========  Enviorment variables are set==============="

echo "======================================================"
peer channel create -o orderer.example.com:7050 -c logisticschannel -f ./channel-artifacts/logisticschannel.tx --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
echo "======================================================"

echo "==================Joining for peer0.org1.example.com:7051======================="
peer channel join -b logisticschannel.block
echo "======================================================"

echo "==================Update anchor peers for peer0.org1.example.com====================="
peer channel update -o orderer.example.com:7050 -c logisticschannel -f ./channel-artifacts/Org1MSPanchors_farmer_logistics.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
echo "======================================================"

echo "==================channel install for peer0.org1.example.com====================="
peer chaincode install -n logisticschaincode -v 1.0 -l node -p /opt/gopath/src/github.com/chaincode/logistics/node/
echo "====================================================="

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
CORE_PEER_ADDRESS=peer0.org2.example.com:9051
CORE_PEER_LOCALMSPID="Org2MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt

echo "==========  Enviorment variables are set==============="

echo "==================Joining for peer0.org2.example.com:9051======================="
peer channel join -b logisticschannel.block
echo "======================================================"

echo "==================Update anchor peers for peer0.org2.example.com====================="
peer channel update -o orderer.example.com:7050 -c logisticschannel -f ./channel-artifacts/Org2MSPanchors_supplier_logistics.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
echo "======================================================"

echo "==================channel install for peer0.org2.example.com====================="
peer chaincode install -n logisticschaincode -v 1.0 -l node -p /opt/gopath/src/github.com/chaincode/supplier_customer/node/
echo "====================================================="

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.example.com/users/Admin@org3.example.com/msp
CORE_PEER_ADDRESS=peer0.org3.example.com:11051
CORE_PEER_LOCALMSPID="Org3MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt

echo "==========  Enviorment variables are set==============="

echo "==================Joining for peer0.org3.example.com:11051======================="
peer channel join -b logisticschannel.block
echo "======================================================"

echo "==================Update anchor peers for peer0.org3.example.com====================="
peer channel update -o orderer.example.com:7050 -c logisticschannel -f ./channel-artifacts/Org3MSPanchors_customer_logistics.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
echo "======================================================"

echo "==================channel install for peer0.org3.example.com====================="
peer chaincode install -n logisticschaincode -v 1.0 -l node -p /opt/gopath/src/github.com/chaincode/supplier_customer/node/
echo "====================================================="

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.example.com/users/Admin@org4.example.com/msp
CORE_PEER_ADDRESS=peer0.org4.example.com:13051
CORE_PEER_LOCALMSPID="Org4MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.example.com/peers/peer0.org4.example.com/tls/ca.crt

echo "==========  Enviorment variables are set==============="

echo "==================Joining for peer0.org4.example.com:13051======================="
peer channel join -b logisticschannel.block
echo "======================================================"

echo "==================Update anchor peers for peer0.org4.example.com====================="
peer channel update -o orderer.example.com:7050 -c logisticschannel -f ./channel-artifacts/Org4MSPanchors.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
echo "======================================================"

echo "==================channel install for peer0.org4.example.com====================="
peer chaincode install -n logisticschaincode -v 1.0 -l node -p /opt/gopath/src/github.com/chaincode/supplier_customer/node/
echo "====================================================="
