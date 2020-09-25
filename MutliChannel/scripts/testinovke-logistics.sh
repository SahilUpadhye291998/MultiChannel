echo "==============================================================="
echo "                          Init Invoke"
echo "==============================================================="

echo "==============================================================="
echo "                          Chaincode"
echo "==============================================================="
peer chaincode invoke -o orderer.example.com:7050 \
--ordererTLSHostnameOverride orderer.example.com \
--tls true \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
--channelID logisticschannel --name logistics \
--peerAddresses peer0.org4.example.com:13051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.example.com/peers/peer0.org4.example.com/tls/ca.crt \
--isInit -c '{"function":"Init","Args":[]}'

echo "==============================================================="
echo "                          Chaincode"
echo "==============================================================="
peer chaincode invoke -o orderer.example.com:7050 \
--ordererTLSHostnameOverride orderer.example.com \
--tls true \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
--channelID logisticschannel --name logistics \
--peerAddresses peer0.org4.example.com:13051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.example.com/peers/peer0.org4.example.com/tls/ca.crt \
--isInit -c '{"function":"initLogistics","Args":["Logistics","Earth","12345678","A1!", "100000"]}'

echo "==============================================================="
echo "                          Chaincode"
echo "==============================================================="
peer chaincode invoke -o orderer.example.com:7050 \
--ordererTLSHostnameOverride orderer.example.com \
--tls true \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
--channelID logisticschannel --name logistics \
--peerAddresses peer0.org4.example.com:13051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.example.com/peers/peer0.org4.example.com/tls/ca.crt \
--isInit -c '{"function":"addProduct","Args":["Logistics12345678","Customer12345678","Supplier12345678","Product 1","6"]}'
