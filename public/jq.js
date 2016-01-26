(function(){
	"use strict";

	$.get('/api/user',function(users){
		var cnt = '<thead><tr><th>first name</th>last name<th></th></tr></thead><tbody>';
		users.forEach(function(user){
			cnt += '<tr><td>' + user.firstName + '</td><td>' + user.lastName + '</td></tr>';
		});
		cnt +='<tbody>';
		
		$('#cnt').html(cnt);
	});
})()
