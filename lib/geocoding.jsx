{/* <script type = "text/javascript" src = "http://maps.google.com/maps/api/js?sensor=false" ></script >
  <script type="text/javascript">

  var geocoder = new google.maps.Geocoder();
  var address = "new york";
  
  geocoder = new google.maps.Geocoder();
    if (geocoder) {
    geocoder.geocode({
      'address': address
    }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        callback(results[0]);
      }
    })};
</script> */}