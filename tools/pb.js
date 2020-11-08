const path = require('path');
const shell = require('shelljs');
const rimraf = require('rimraf');


const PROTO_DIR = path.join(__dirname, '../protos');
const MODEL_DIR = path.join(__dirname, '../protobuf');

rimraf.sync(`${MODEL_DIR}/*`);

shell.exec(`pbjs `
  + `--target static-module `
  + `--wrap commonjs `
  + `--keep-case `
  + `--path ${PROTO_DIR} `
  + `--out ${MODEL_DIR}/rpc.js `
  + `${PROTO_DIR}/*.proto; `
  + `pbts `
  + `--out ${MODEL_DIR}/rpc.d.ts `
  + `${MODEL_DIR}/rpc.js`);