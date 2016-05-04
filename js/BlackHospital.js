var remote_data;
var myDataRef;
(function($) {
    $(function() {
        // var myDataRef = new Firebase('https://torrid-heat-9808.firebaseio.com/');
        myDataRef = new Wilddog("https://blackhospital.wilddogio.com/");
        // addDataFromGit(myDataRef);
        myDataRef.on("value", function(snapshot) {
            initJETS(snapshot.val());
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }); // end of document ready
})(jQuery); // end of jQuery name space

function addDataFromGit() {
    $.getJSON("https://raw.githubusercontent.com/sunjintw/docs/master/hospitals.json", function(json) {
        myDataRef.on("value", function(snapshot) {
            console.log(snapshot.val());
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
        myDataRef.set(json);
    });
}

function openAddModal() {
    $('#add_modal').openModal();
}

function initJETS(data) {
    $('#jetsContent').html('');
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

function addHospital() {
    var hospital_name = $('#hospital_name').val();
    var location_name = $('#location_name').val();
    var is_added = false;
    var current_locations;
    myDataRef.once("value", function(snapshot) {
            current_locations = snapshot.val().locations;
            $.each(current_locations, function(index, location) {
                if (location.name == location_name) {
                    if (($.inArray(hospital_name, location.hospitals)) < 0) {
                        location.hospitals.push(hospital_name);
                    }
                    is_added = true;
                    return;
                }
            });
            if (!is_added) {
                current_locations.push({ name: location_name, hospitals: [hospital_name] });
                is_added = true;
            }
            if (is_added) {
                myDataRef.update({ locations: current_locations });
            }
        },
        function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
}
