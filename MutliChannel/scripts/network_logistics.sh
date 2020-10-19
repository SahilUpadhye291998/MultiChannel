CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.example.com/users/Admin@org4.example.com/msp
CORE_PEER_ADDRESS=peer0.org4.example.com:13051
CORE_PEER_LOCALMSPID="Org4MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.example.com/peers/peer0.org4.example.com/tls/ca.crt

echo "==========  Enviorment variables are set==============="

echo "======================================================"
peer channel create -o orderer.example.com:7050 -c logisticschannel -f ./channel-artifacts/logisticschannel.tx --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
echo "======================================================"

echo "==================Joining for peer0.org4.example.com:13051======================="
peer channel join -b logisticschannel.block
echo "======================================================"

echo "==================Update anchor peers for peer0.org4.example.com====================="
peer channel update -o orderer.example.com:7050 -c logisticschannel -f ./channel-artifacts/Org4MSPanchors.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
echo "======================================================"

echo "==================channel install for peer0.org1.example.com====================="
peer chaincode install -n logistics -v 1.0 -l node -p /opt/gopath/src/github.com/chaincode/logistics/node/
echo "====================================================="