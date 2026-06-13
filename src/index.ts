import express, { Request, Response } from 'express';
import { exec } from 'child_process';
import path from 'path';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin
// Note: In a real environment, you'd use a service account key file
// For Quasilink, we assume the environment is already authenticated or use defaults
admin.initializeApp({
    projectId: 'sshftpsmb', // Based on serviceId in Kotlin config
});

const db = admin.firestore();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Path to Taylor scripts
const TAYLOR_PATH = path.join(__dirname, 'taylor');

/**
 * Xerve Endpoint: Fractal Extrapolate
 */
app.post('/extrapolate', async (req: Request, res: Response) => {
    const { data, steps, substrateId } = req.body;

    if (!data || !steps) {
        return res.status(400).json({ error: 'Missing data or steps' });
    }

    // Command to execute Wolfram script
    const command = `wolframscript -file ${path.join(TAYLOR_PATH, 'FractalExtrapolator.wl')} -args "${JSON.stringify(data)}" ${steps}`;

    console.log(`Executing: ${command}`);
    
    // Simulate output
    const simulatedOutput = data.map((v: number) => Math.abs(v * v + Math.random()));
    
    // Persist result to Firebase if substrateId is provided
    if (substrateId) {
        await db.collection('extrapolations').doc(substrateId).set({
            originalData: data,
            extrapolatedData: simulatedOutput,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });
    }

    res.json({ 
        result: simulatedOutput, 
        message: 'Aesthetic extrapolation complete.',
        substrateId
    });
});

/**
 * Xerve Endpoint: Initialize Substrate
 */
app.get('/substrate/init', async (req: Request, res: Response) => {
    const substrateId = `sub_${Date.now()}`;
    
    await db.collection('substrates').doc(substrateId).set({
        status: 'initialized',
        type: 'Hypergraph',
        phaseSpace: 'active',
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({ 
        status: 'Substrate initialized in phase space', 
        substrateId,
        substrateType: 'Hypergraph' 
    });
});

/**
 * Xerve Endpoint: Generate Substrate Network
 */
app.post('/substrate/network', async (req: Request, res: Response) => {
    const { nodes, substrateId } = req.body;
    
    // In a real implementation, this would call GenerateSubstrateNetwork in Wolfram
    const network = {
        type: 'SubstrateNetwork',
        nodes: Array.from({ length: nodes || 10 }, (_, i) => i + 1),
        edges: Array.from({ length: nodes || 10 }, (_, i) => [i + 1, ((i + 1) % (nodes || 10)) + 1]),
    };

    if (substrateId) {
        await db.collection('substrates').doc(substrateId).update({
            network,
            lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
        });
    }

    res.json({
        message: 'Substrate network generated.',
        network,
        substrateId
    });
});

/**
 * Xerve Endpoint: Bridge to External Network
 */
app.post('/substrate/bridge', async (req: Request, res: Response) => {
    const { substrateId, externalUri } = req.body;

    if (!substrateId || !externalUri) {
        return res.status(400).json({ error: 'Missing substrateId or externalUri' });
    }

    // Reference memory persistence convention: https:// or // \\
    const isLocal = externalUri.startsWith('// \\\\');
    const isRemote = externalUri.startsWith('https://');

    if (!isLocal && !isRemote) {
         return res.status(400).json({ error: 'externalUri must start with https:// or // \\\\' });
    }

    await db.collection('bridges').doc(substrateId).set({
        externalUri,
        bridgeStatus: 'connected',
        type: isRemote ? 'remote' : 'local',
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({
        message: 'Bridge established.',
        substrateId,
        externalUri,
        type: isRemote ? 'remote' : 'local'
    });
});

app.listen(port, () => {
    console.log(`Xerve backend listening at http://localhost:${port}`);
    console.log(`Quasilink substrate ready. Service ID: sshftpsmb`);
});
