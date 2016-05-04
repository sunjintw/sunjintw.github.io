(function($) {
    $(function() {
        // var myDataRef = new Firebase('https://torrid-heat-9808.firebaseio.com/');
        var myDataRef = new Wilddog("https://blackhospital.wilddogio.com/");
        // addDataFromGit(myDataRef);
        myDataRef.on("value", function(snapshot) {
            initJETS(snapshot.val());
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }); // end of document ready
    function initJETS(data) {
        $.each(data.locations, function(index, location) {
            $.each(location.hospitals, function(index, hospital) {
                $('#jetsContent').append('<tr>' + '<td>' + hospital + '</td>' + '<td>' + location.name + '</td>' + '</tr>')
            });
        });
        var jets = new Jets({
            searchTag: '#jetsSearch',
            contentTag: '#jetsContent'
        });
    }

    function addDataFromGit(myDataRef) {
        $.getJSON("https://raw.githubusercontent.com/sunjintw/docs/master/hospitals.json", function(json) {
            myDataRef.on("value", function(snapshot) {
                console.log(snapshot.val());
            }, function(errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
            myDataRef.set(json);
        });
    }



})(jQuery); // end of jQuery name space
