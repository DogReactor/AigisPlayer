(function (context) {
    var validPasswords = [
        "a677fa7e9825854e65d50cacfcab6d4d7bb9a0531faa45b1d79198af49d7ff3e",
        "f72d601f63cc9a02c9a19b67622345d4d48e0533f91e3afd9932c829a9c27a38",
        "f45015f8d105ce0e8fb51808e9427146c672047ce38bcddc5db82c91376fe8c5",
        "3c4d1197b1796e5a0c5639b67151ea19a1fc57c0a5147a830b9305b18f91c973",
        "9f966baf1051cae5a334d9d90868439d59733677f05b1fed5dbb8ae16f8242cb",
        "1c90fb750c1f96e93def99e843d2e1fa9cc58b06bfe0e8032570df47b56ebcb5",
        "c16a0eec5392f583a032d4a2d7d8eff7a55b113499b7c951a27272dc0bb906fa",
        "8190f02550721a356241518113232b28ca9fa30569a0547f2a78e95d4fe84f99",
        "fe0b43894d2c096fa8d595ee3bdc66f2b300277ee0ea61a94fa386d2353cd70a",
        "653d66433db54fdb08ea1c0cab3cd7b6124668f3d6ddf6d79d4028b1dc3958e2",
        "4f00cef539277496e280b68ecab74c35d09e3fec9e01c6d19928fd9a8093e230",
        "f6ee73c756f4ddecdcc94d9a21cfd3f662d6ee4d21bf5b2f43a3d838cf4847ca",
        "40b4351edd845f2d31beadffa40c30f5a251c38519d493e825e3dab08c5d3754",
        "d75e80385dd96d5c767164f5c1897510198107656832e28bfbb130a24fb2b50f",
        "4ea1e70dfeca7fa86c79c085817e261587ee3a7b8733513b61cdd9d022976e2a",
        "2e748f437a9f290218718e0536fc5bd6a42485ec845353b1e740eb124bd967be",
        "5ad4c1bc039d826ee81ae474942651d77ff681645dc46a193687f8f113254660",
        "64058497f1e8a98b813778ec2cc12161b017e32078739198efbd464daa5a59ef",
        "c9d1adda22f5fbf19e76137ae450601fcc41d6acbd718dbbd3b9cdb2fd79866f",
        "372ee1863c451400423e83c9e190dbed40c72d24e91c9f51cefee683c44a12bc",
        "5e95ba44fe1c7ad1c698077b8ebb19ca7af59a7710bb83e38c666d5f82796705",
        "a8cdf6b9b2a53b220ddeaa9b03b19876c96168e8091019f6a08975aa82902033",
        "496b05b4cc973efa2294dcf623d1844cc5d32c7870f654acf0ca94e6699db238",
        "8b1fdd0442c4cf1858fe7db91a50358131989bd077536aecf9b50677e77e6cfe",
        "b0dd18a3e2c5abbc0cbc6676172e1238e9ae7ebaf3d8d8cbfb32fca64ce583ed",
        "06b479db0f6c8a7f2c37e3e88df516a2c82b61d7fe9e65f6cd97bf88d904c0af",
        "8ae2c3046b983f566d8f4aaa82df32cd8a87d4d45e6dd6a36b8badc081b24779",
        "56975f06db5e3c47dabe191b19fe9d0b5515c27ed2d8d2f22f6170708d982107",
        "02a1ec4ccd7508d500c6828344a05cdde677c45f657c6666a013103c65c92961",
        "e4f4181bf5454570c2c81e25ca0355185ce79d4571cd36375d3b1d4d3c60faae",
        "1d90237aa5fc9d4b56c1018ff2ba5785aadbdbffac74b90666b326809bdf3162",
        "f0605725bd1072de5a74c7a023292ad8902ae733caaf8a43fa83abf97cf6fc8d",
        "27e9dc666ef2e98efa326fbec17c0537ab5d0ad68d97fbe7498542d6ce5f4439",
        "7261a50fe0748dac509de21d409029add955df6945ac31c7f150ed8263a7af42",
        "a789c9996747c6deb154aafe52eb30eb0bf78722ccda109367a4bba6efd6b8fa",
        "d8a7d242452f9d06e3d43a68e1a3d5c588cb94e58ca9d0341e6ec185ae973194",
        "72c4c219fa9885118bce36ed17ee8c6c50717197ca92a0a4782490e954dc5a00",
        "f253281ec6aa30da9b2a688bb59441e800db1eeb122d11b3304aa17d0dafa73c",
        "7f6f8e53a859b819e8871a505d187365769ece3224dd9dae9125f79a07bd4000",
        "03b281359924154c853781602fbfe8e1086a1a49d4d6e9b8e384a20b76f1c4b3",
        "5bf6b5c7586e848c01452fd9ff3fdde45ba24c07dd0433356ae23283c6ce2168",
        "276c6646804201b4acacb2c8fc30730dcbdbe371eea3cb6cbc8945a601b66497",
    ];

    var revokedPasswords = [
    ];

    function getAuthenticationHash (password) {
        var hasher = new jsSHA("SHA-256", "TEXT");
        hasher.update("vira " + password.trim().toLowerCase() + " mate");
        return hasher.getHash("HEX");
    };

    function isValidPassword (password) {
        if (revokedPasswords.indexOf(hash) >= 0)
            return false;

        var hash = getAuthenticationHash(password);
        if (validPasswords.indexOf(hash) >= 0)
            return true;

        return false;
    };

    context.getAuthenticationHash = getAuthenticationHash;
    context.isValidPassword = isValidPassword;
})(window);