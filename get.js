// Function to get URL parameter
    function getQueryParam(name, url) {
        url = url || self.window.document.location.href;
        var start = url.indexOf(name + '=');
        if (start == -1) return '';
        var len = start + name.length + 1;
        var end = url.indexOf('######', len);
        if (end == -1) end = url.length;
        return decodeURIComponent(url.substring(len, end));
    }

    // Function to encode a string to Base64
    function base64Encode(str) {
        return btoa(unescape(encodeURIComponent(str)));
    }

    // Function to decode Base64 to string
    function base64Decode(str) {
        return decodeURIComponent(escape(atob(str)));
    }

    // Get the video 'id' from the URL, assuming it's Base64 encoded
    var encodedId = getQueryParam('id');
    var id = encodedId ? base64Decode(encodedId) : '';

    // Check if 'id' is valid
    if (id) {
        var dp = new DPlayer({
            container: document.getElementById('okstreamtv'),
            theme: "#ffffff",
            loop: false,
            autoplay: false,
            hotkey: true,
            preload: "metadata",
            mutex: true,
            video: {
                quality: [{
                    url: id,
                    name: " ",
                    type: 'auto',
                }],
                defaultQuality: 0,
                pic: 'https://da.gd/iNG7X',
                referrerPolicy: "no-referrer"
            }
        });

        // Disable right-click context menu
        document.getElementById('okstreamtv').oncontextmenu = function () {
            document.querySelector('.dplayer-menu').style.display = "none";
            document.querySelector('.dplayer-mask').style.display = "none";
            return false;
        };

        // Play video after 1 second delay (optional)
        setTimeout(function () {
            dp.play();
        }, 1000);
    } else {
        console.error("ID video tidak ditemukan dalam URL.");
    }

    // Example of how you could encode an id into Base64 for testing
    // var base64EncodedId = base64Encode('your-video-id-here');
    // console.log(base64EncodedId);
