import { convertFromDirectory } from 'joi-to-typescript';

convertFromDirectory({
    schemaDirectory: './src/electron/schemas',
    typeOutputDirectory: './src/electron/interfaces',
    debug: true,
    useLabelAsInterfaceName: true
});
