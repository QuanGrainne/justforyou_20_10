import fs from 'fs';
import path from 'path';

// Valid minimal silent MPEG audio frame (MPEG-1 Layer 3, 128kbps, 44100Hz)
const silentMp3Base64 = 
  "//uQxAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAFAAAA7AAEBgcJCgwNDhESExQVFhcZGhscHR4fICEiIyQlJicoKiwtLi8wMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaW1xdXl9gYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXp7fH1+f4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/";

const targetFile = path.resolve('public/music/background.mp3');
if (!fs.existsSync(targetFile)) {
  fs.writeFileSync(targetFile, Buffer.from(silentMp3Base64, 'base64'));
  console.log(`Created placeholder ${targetFile}`);
}
