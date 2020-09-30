echo "==============================================================="
echo "                          Init Invoke"
echo "==============================================================="

echo "==============================================================="
echo "                  Supplier Customer Chaincode"
echo "==============================================================="
peer chaincode invoke -o orderer.example.com:7050 \
--ordererTLSHostnameOverride orderer.example.com \
--tls true \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
--channelID suppliercustomerchannel --name suppliercustomer \
--peerAddresses peer0.org2.example.com:9051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt \
--peerAddresses peer0.org3.example.com:11051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt \
--isInit -c '{"function":"Init","Args":[]}'

sleep 3
echo "==============================================================="
echo "                  Supplier Customer Chaincode 1"
echo "==============================================================="
peer chaincode invoke -o orderer.example.com:7050 \
--ordererTLSHostnameOverride orderer.example.com \
--tls true \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
--channelID suppliercustomerchannel --name suppliercustomer \
--peerAddresses peer0.org2.example.com:9051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt \
--peerAddresses peer0.org3.example.com:11051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt \
-c '{"function":"initSupplier","Args":["xGod666","Earth","12345678","A1!", "100000"]}'

sleep 3
echo "==============================================================="
echo "                  Supplier Customer Chaincode 2"
echo "==============================================================="
peer chaincode invoke -o orderer.example.com:7050 \
--ordererTLSHostnameOverride orderer.example.com \
--tls true \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
--channelID suppliercustomerchannel --name suppliercustomer \
--peerAddresses peer0.org2.example.com:9051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt \
--peerAddresses peer0.org3.example.com:11051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt \
-c '{"function":"initCustomer","Args":["Customer","Earth","12345678","A1!", "100000"]}'

sleep 3
echo "==============================================================="
echo "                  Supplier Customer Chaincode 3"
echo "==============================================================="
peer chaincode invoke -o orderer.example.com:7050 \
--ordererTLSHostnameOverride orderer.example.com \
--tls true \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
--channelID suppliercustomerchannel --name suppliercustomer \
--peerAddresses peer0.org2.example.com:9051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt \
--peerAddresses peer0.org3.example.com:11051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt \
-c '{"function":"addProductCustomerSupplier","Args":["Customer12345678","xGod66612345678","product 1","10", "100"]}'

sleep 3
echo "==============================================================="
echo "                  Supplier Customer Chaincode 4"
echo "==============================================================="
peer chaincode invoke -o orderer.example.com:7050 \
--ordererTLSHostnameOverride orderer.example.com \
--tls true \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
--channelID suppliercustomerchannel --name suppliercustomer \
--peerAddresses peer0.org2.example.com:9051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt \
--peerAddresses peer0.org3.example.com:11051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt \
-c '{"function":"addProductCustomerSupplier","Args":["Customer12345678","xGod66612345678","product 1","-10", "100"]}'

sleep 3
echo "==============================================================="
echo "                  Supplier Customer Chaincode 5"
echo "==============================================================="
peer chaincode invoke -o orderer.example.com:7050 \
--ordererTLSHostnameOverride orderer.example.com \
--tls true \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
--channelID suppliercustomerchannel --name suppliercustomer \
--peerAddresses peer0.org2.example.com:9051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt \
--peerAddresses peer0.org3.example.com:11051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt \
-c '{"function":"addSupplierAmount","args":["xGod66612345678","4000"]}'

sleep 3
echo "==============================================================="
echo "                  Supplier Customer Chaincode 5"
echo "==============================================================="
peer chaincode invoke -o orderer.example.com:7050 \
--ordererTLSHostnameOverride orderer.example.com \
--tls true \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
--channelID suppliercustomerchannel --name suppliercustomer \
--peerAddresses peer0.org2.example.com:9051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt \
--peerAddresses peer0.org3.example.com:11051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt \
-c '{"function":"addCustomerAmount","args":["Customer12345678","4000"]}'

sleep 3
echo "==============================================================="
echo "                          Chaincode Test 8"
echo "==============================================================="
peer chaincode query \
--channelID suppliercustomerchannel --name suppliercustomer \
-c '{"Args":["readSupplierData","xGod66612345678"]}'

sleep 3
echo "==============================================================="
echo "                          Chaincode Test 9"
echo "==============================================================="
peer chaincode query \
--channelID suppliercustomerchannel --name suppliercustomer \
-c '{"Args":["readCustomerData","Customer12345678"]}'
