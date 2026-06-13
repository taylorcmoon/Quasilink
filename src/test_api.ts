import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

async function runTests() {
    console.log('--- Starting Quasilink Extensive Testing ---');

    try {
        // 1. Initialize Substrate
        console.log('\n[Test 1] Initializing Substrate...');
        const initRes = await axios.get(`${BASE_URL}/substrate/init`);
        const substrateId = initRes.data.substrateId;
        console.log('Result:', initRes.data);

        // 2. Generate Substrate Network
        console.log('\n[Test 2] Generating Substrate Network...');
        const networkRes = await axios.post(`${BASE_URL}/substrate/network`, {
            substrateId,
            nodes: 15
        });
        console.log('Result:', networkRes.data);

        // 3. Bridge to Remote (https://)
        console.log('\n[Test 3] Bridging to Remote Network (https://)...');
        const remoteBridgeRes = await axios.post(`${BASE_URL}/substrate/bridge`, {
            substrateId,
            externalUri: 'https://api.quasilink.network/v1/state'
        });
        console.log('Result:', remoteBridgeRes.data);

        // 4. Bridge to Local (// \\)
        console.log('\n[Test 4] Bridging to Local Substrate (// \\\\)...');
        const localBridgeRes = await axios.post(`${BASE_URL}/substrate/bridge`, {
            substrateId,
            externalUri: '// \\\\local\\substrate\\alpha'
        });
        console.log('Result:', localBridgeRes.data);

        // 5. Test Invalid URI (Should Fail)
        console.log('\n[Test 5] Bridging with Invalid URI (Expected Failure)...');
        try {
            await axios.post(`${BASE_URL}/substrate/bridge`, {
                substrateId,
                externalUri: 'ftp://invalid-uri'
            });
        } catch (err: any) {
            console.log('Correctly failed with error:', err.response?.data?.error || err.message);
        }

        // 6. Test Fractal Extrapolation (Mocked)
        console.log('\n[Test 6] Testing Fractal Extrapolation...');
        const extrapolateRes = await axios.post(`${BASE_URL}/extrapolate`, {
            data: [1.1, 2.2, 3.3],
            steps: 5,
            substrateId
        });
        console.log('Result:', extrapolateRes.data);

        console.log('\n--- All Tests Completed Successfully ---');
    } catch (error: any) {
        console.error('\n!!! Test Suite Failed !!!');
        console.error(error.response?.data || error.message);
        process.exit(1);
    }
}

runTests();
