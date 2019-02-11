url = 'http://data.ct.gov/resource/9k2y-kqxn.json?organization_type=Public%20School%20Districts&$$app_token=CGxaHQoQlgQSev4zyUh5aR5J3';

$.getJSON(url, function (data, textstatus) {
  console.log(data);
  $.each(data, function (i, entry) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(entry.location_1.latitude,
        entry.location_1.longitude),
      map: map,
      title: location.name
    });
  });
});