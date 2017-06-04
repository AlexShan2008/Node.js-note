/**
 * Created by ShanGuo on 2017/5/13.
 */
let mime = require('mime');

let mimeType = mime.lookup('server.css');

console.log(mimeType);