(function () {

  var hash = CryptoJS.SHA3("Message");



  console.log(encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase").toString())
  console.log(decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase").toString(CryptoJS.enc.Utf8));
  console.log(decrypted = CryptoJS.AES.decrypt("U2FsdGVkX1+affa/qUmE81tUitlJwm5temEZMzuvJK0=", "Secret Passphrase").toString(CryptoJS.enc.Utf8));
  console.log(decrypted = CryptoJS.AES.decrypt("U2FsdGVkX19Zq4EvWXWH0yzFAA+cYYH8xmIuu0joAa8=", "Secret Passphrase").toString(CryptoJS.enc.Utf8));

  console.log(encrypted = CryptoJS.AES.encrypt("Message1", "Secret Passphrase").toString())
  console.log(decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase").toString(CryptoJS.enc.Utf8));

  console.log(encrypted = CryptoJS.AES.encrypt("Message kjdsh kjdhfgkjs dhflkgj hsdkfjhg skjl ksfghskjgshfkljsdf sfk lkdfjh", "Secret Passphrase").toString())
  console.log(decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase").toString(CryptoJS.enc.Utf8));


  return;

  var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase");
  console.log(encrypted.toString());
  console.log(encrypted.key.toString());
  console.log(encrypted.iv.toString());
  console.log(encrypted.salt.toString());
  console.log(encrypted.ciphertext.toString());
  // ​
  // encrypted.key
  // > "74eb593087a982e2a6f5dded54ecd96d1fd0f3d44a58728cdcd40c55227522223 ";
  // ​
  // encrypted.iv
  // > "7781157e2629b094f0e3dd48c4d786115";
  // ​
  // encrypted.salt
  // > "7a25f9132ec6a8b34";
  // ​
  // encrypted.ciphertext
  // > "73e54154a15d1beeb509d9e12f1e462a0";
  // ​
  // encrypted
  // > "U2FsdGVkX1+iX5Ey7GqLND5UFUoV0b7rUJ2eEvHkYqA=";

  // return;


  var JsonFormatter = {
    stringify: function(cipherParams) {
      // create json object with ciphertext
      var jsonObj = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) };
      // optionally add iv or salt
      if (cipherParams.iv) {
        jsonObj.iv = cipherParams.iv.toString();
      }
      if (cipherParams.salt) {
        jsonObj.s = cipherParams.salt.toString();
      }
      // stringify json object
      return JSON.stringify(jsonObj);
    },
    parse: function(jsonStr) {
      // parse json string
      var jsonObj = JSON.parse(jsonStr);
      // extract ciphertext from json object, and create cipher params object
      var cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
      });
      // optionally extract iv or salt
      if (jsonObj.iv) {
        cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv);
      }
      if (jsonObj.s) {
        cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s);
      }
      return cipherParams;
    }
  };




  var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase", {
    format: JsonFormatter
  }).toString();
  console.log(encrypted)
  // encrypted
  // > {
  //     ct: "tZ4MsEnfbcDOwqau68aOrQ==",
  //     iv: "8a8c8fd8fe33743d3638737ea4a00698",
  //     s: "ba06373c8f57179c"
  //   };
  var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase", {
    format: JsonFormatter
  });
  console.log (decrypted.toString(CryptoJS.enc.Utf8));
  return;


  console.log(encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase").toString())
  console.log(decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase").toString(CryptoJS.enc.Utf8));


  var key = CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f");
  console.log(key);
  var iv = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");
  console.log(key);

  var aesEncryptor = CryptoJS.algo.AES.createEncryptor(key, { iv: iv });
  var ciphertextPart1 = aesEncryptor.process("Message Part 1");
  var ciphertextPart2 = aesEncryptor.process("Message Part 2");
  var ciphertextPart3 = aesEncryptor.process("Message Part 3");
  var ciphertextPart4 = aesEncryptor.finalize();
  // console.log(aesEncryptor.toString());
  console.log(aesEncryptor, aesEncryptor.toString(CryptoJS.enc.Base64));
  return;




  var aesDecryptor = CryptoJS.algo.AES.createDecryptor(key, { iv: iv });
  var plaintextPart1 = aesDecryptor.process(ciphertextPart1);
  var plaintextPart2 = aesDecryptor.process(ciphertextPart2);
  var plaintextPart3 = aesDecryptor.process(ciphertextPart3);
  var plaintextPart4 = aesDecryptor.process(ciphertextPart4);
  var plaintextPart5 = aesDecryptor.finalize();

  console.log(aesDecryptor);




  return;





  data = "IYkyGxYaNgHpnZWgwILMalVFmLWFgTCHCZL9263NOcfSo5lBjAzOZAtF5bF++R0Bi+9c9E+p3VEr/xvj4oABtRWVJ2wlWzLbYC2rKFk5iapFhb7uZCUpO4w4Su3a5QFa2vInjYueziRoqySZd/DpstMJ8rsJ94VGizFFFZ1l0sw1ax+wfBAv5+wHs/hlnHi/ea66KBO3rgXKahvV28h+4bh5etc8RCrmiiNbfg6Oj0jQJDjdYIdW8T9YPOI9E1hih8lbfRnMWcOFJgYekfLpoy5LI525UGnlM46J1k6ekLqsn9FqvbiOOoLgqa4YqBm1i9P0ePyjkME+t+RiL8xXX+ItgOYr9G7kM64wlTJPCW8B/crmUdmGzQNC/hD/u/8wfHBS2f8u6OtQMG/+Kpk1oju8lcUZGI/4S8A6/OuktvQr2zgnbs2aADMrM37Oait/pJ3G73S7NwVT8EaK+X43c0C/fUvW2/bD/rqCNpAh9WQlz4Cj6JHwjbmwuind6aCimF1tHjXuR9FXu+g17sPT4ZkKZ6aeBG+m170XdCGn2hVM0wH1rh3VeCG2u/JFqfuGKGSoqeHeNY/icu9pEhtZDzHd7aPoaMXcWvXC9PjooBf7GM1EPacSdnon1kBobjtKSt1l15DjO5TMrJoX7VO7GotQwo+uI/u5Kop01hBXxyxyggl1/8N0ESohPJoqLDrIwvbGK5kW4B49FVPnx9CMvjZDdSsoxPAh+hx6SPe8Hj0Nx4bRs06cbtOkte/V8QSYIqjiJDleEqPrdiKlvgToZz9L29ZR/3Ln65qU1sq7q9c0SEYxIopV7TdTjFS7y76zDPFZkhzc3DjfLtJo/M1hdtt648APcZdmAIgWH6fh3eJZ0qbiPh8RStYH7I2COmnlMw4+t/B5mlhYVSgwPK2Ir736Mh+P9Bw0fF8r9Ghhs4AJzpU0RiK9d1tCsrLfK/hSRwTXhtsSB6eDWEGkO7oeEIz43mgn0sv3SrA9JNHzYkg=";
  key = "2e35f242a46d67eeb74aabc37d5e5d05";

  // Decode the base64 data so we can separate iv and crypt text.
  var rawData = atob(data);
  var iv = btoa(rawData.substring(0,16));
  var crypttext = btoa(rawData.substring(16));

  // Decrypt...
  var plaintextArray = CryptoJS.AES.decrypt(
    {
      ciphertext: CryptoJS.enc.Base64.parse(crypttext),
      salt: ""
    },
    CryptoJS.enc.Hex.parse(key),
    { iv: CryptoJS.enc.Base64.parse(iv) }
  );

  // Convert hex string to ASCII.
  // See https://stackoverflow.com/questions/11889329/word-array-to-string
  function hex2a(hex) {
      var str = '';
      for (var i = 0; i < hex.length; i += 2)
          str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      return str;
  }

  console.log(hex2a(plaintextArray.toString()));
  return;


  console.log(encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase"))
  console.log(encrypted.toString());
  console.log(decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase"));
  console.log(decrypted.toString());
  return;



  var hash = CryptoJS.SHA256("Message");
  console.log(hash.toString(CryptoJS.enc.Base64));
  console.log(hash.toString(CryptoJS.enc.Hex));
  var hash = CryptoJS.HmacSHA256("Message", "Secret Passphrase");
  console.log(hash.toString(CryptoJS.enc.Base64));
  console.log(hash.toString(CryptoJS.enc.Hex));

  console.log(hash.toString(CryptoJS.enc.Hex));






  var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase");
  console.log(encrypted);
  var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
  console.log(decrypted);


  return;

  var textString = 'Hello world'; // Utf8-encoded string
  var words = CryptoJS.enc.Utf8.parse(textString); // WordArray object
  var base64 = CryptoJS.enc.Base64.stringify(words); // string: 'SGVsbG8gd29ybGQ='
  console.log(base64);

  // var base64 = 'SGVsbG8gd29ybGQ=';
  var words = CryptoJS.enc.Base64.parse(base64);
  var textString = CryptoJS.enc.Utf8.stringify(words); // 'Hello world'
  console.log(textString);

  return;

  var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, "Secret Passphrase");
  hmac.update("Message Part 1");
  hmac.update("Message Part 2");
  hmac.update("Message Part 3");
  var hash = hmac.finalize();

  var base64 = hash.toString(CryptoJS.enc.Base64);
  console.log(1, base64);

  var words = CryptoJS.enc.Base64.parse(base64);
  var message = CryptoJS.enc.Base64.stringify(words);
  console.log(1, words, message);



  var key = CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f");
  console.log(key);
  var iv = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");
  console.log(key);

  var aesEncryptor = CryptoJS.algo.AES.createEncryptor(key, { iv: iv });
  var ciphertextPart1 = aesEncryptor.process("Message Part 1");
  var ciphertextPart2 = aesEncryptor.process("Message Part 2");
  var ciphertextPart3 = aesEncryptor.process("Message Part 3");
  var ciphertextPart4 = aesEncryptor.finalize();
  // console.log(aesEncryptor.toString());
  console.log(aesEncryptor.toString(CryptoJS.enc.Base64));




  var aesDecryptor = CryptoJS.algo.AES.createDecryptor(key, { iv: iv });
  var plaintextPart1 = aesDecryptor.process(ciphertextPart1);
  var plaintextPart2 = aesDecryptor.process(ciphertextPart2);
  var plaintextPart3 = aesDecryptor.process(ciphertextPart3);
  var plaintextPart4 = aesDecryptor.process(ciphertextPart4);
  var plaintextPart5 = aesDecryptor.finalize();

  console.log(aesDecryptor);

})()
