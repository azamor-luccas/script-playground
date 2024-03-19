#!/usr/bin/env node

import { spawnSync } from 'child_process';

(async () => {
    // Execute 'npx ts-node src/foo.ts'
    const result = spawnSync('npx', ['ts-node', './node_modules/script-playground/index.ts'], { stdio: 'inherit', shell: true });

    // Check if there were any errors
    if (result.error) {
        console.error('Error:', result.error);
        process.exit(1);
    }

    // Exit with the appropriate code
    process.exit(result.status);
})();
