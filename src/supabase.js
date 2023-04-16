
import { createClient } from '@supabase/supabase-js'

function decodeBase64(str) {
    let decodedString = "";
    const base64Chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let char1, char2, char3;
    let enc1, enc2, enc3, enc4;
    let i = 0;

    // Remove any non-base64 characters and padding from the input string
    str = str.replace(/[^A-Za-z0-9+/=]/g, "");

    // Decode the input string into a decoded string
    while (i < str.length) {
      enc1 = base64Chars.indexOf(str.charAt(i++));
      enc2 = base64Chars.indexOf(str.charAt(i++));
      enc3 = base64Chars.indexOf(str.charAt(i++));
      enc4 = base64Chars.indexOf(str.charAt(i++));

      char1 = (enc1 << 2) | (enc2 >> 4);
      char2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      char3 = ((enc3 & 3) << 6) | enc4;

      decodedString += String.fromCharCode(char1);

      if (enc3 !== 64) {
        decodedString += String.fromCharCode(char2);
      }
      if (enc4 !== 64) {
        decodedString += String.fromCharCode(char3);
      }
    }

    return decodedString;
  }
  const encAKey = "ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKemRYQmhZbUZ6WlNJc0luSmxaaUk2SW1ocGMySm9kbUZpYkdSMmVYVnViWEZ2ZG1WcUlpd2ljbTlzWlNJNkltRnViMjRpTENKcFlYUWlPakUyTnprNU9EUXdNekVzSW1WNGNDSTZNVGs1TlRVMk1EQXpNWDAuZE1qQU92b1kwOF9DYU5UN3ZoOUVlN0dTMURGdTBkU3EyM2w1VUQtSUtURQ=="
const supabaseUrl = 'https://hisbhvabldvyunmqovej.supabase.co'
const supabaseKey = decodeBase64(encAKey);
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;