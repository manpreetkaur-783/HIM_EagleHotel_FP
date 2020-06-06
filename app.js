

         //prefixes of implementation that we want to test
         window.indexedDB = window.indexedDB || window.mozIndexedDB || 
         window.webkitIndexedDB || window.msIndexedDB;
         
         //prefixes of window.IDB objects
         window.IDBTransaction = window.IDBTransaction || 
         window.webkitIDBTransaction || window.msIDBTransaction;
         window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || 
         window.msIDBKeyRange
         
         if (!window.indexedDB) {
            window.alert("Your browser doesn't support a stable version of IndexedDB.")
         }
         
         var db;
         var request = window.indexedDB.open("eaglefly", 1);
         
         request.onerror = function(event) {
            console.log("error: ");
         };
         
         request.onsuccess = function(event) {
            db = request.result;
            console.log("success: "+ db);
         };
         
	
         request.onupgradeneeded = function(event) {
            var db = event.target.result;
            var objectStore = db.createObjectStore("tableuser", {keyPath: "id"});
         }
		 
		
	
         request.onupgradeneeded = function(event) {
            var db = event.target.result;
            var objectStore = db.createObjectStore("tableuser", {keyPath: "id"});
			var objectStore = event.target.result.createObjectStore("tablecontact", {keyPath: "id", autoIncrement:true});
            var objectStore = db.createObjectStore("tablebooking", {keyPath: "id", autoIncrement:true});
         }


window.onload = function() {
	
if (sessionStorage['mylogin']) {	
	
document.getElementById("result1").innerHTML = sessionStorage.getItem("mylogin");
document.getElementById("notlogin").style.display='none';
}
else
{
document.getElementById("login").style.display='none';
document.getElementById("notlogin").style.display='block';

}



var list = document.querySelector('#box1');
list.innerHTML = '';

				 var tableRow = document.createElement('tr');
      tableRow.innerHTML = '<th>Name</th><th>Email</th><th>Message</th>';
      list.appendChild(tableRow); 

var objectStore = db.transaction("tablecontact").objectStore("tablecontact");
objectStore.openCursor().onsuccess = function(event) {
   var cursor = event.target.result;
   var sessionemail=sessionStorage.getItem("mylogin");
   if (cursor) {
	   
	   if(cursor.value.session==sessionemail)
	   {
	   
				 var tableRow = document.createElement('tr');
      tableRow.innerHTML = '<td>' + cursor.value.name + '</td>'
                           + '<td>' + cursor.value.email + '</td>'
						   + '<td>' + cursor.value.message + '</td>';
      list.appendChild(tableRow);   
	   }
	    
	  
      cursor.continue();
   } 
};


var bookinglist = document.querySelector('#box2');
bookinglist.innerHTML = '';

				 var tableRow = document.createElement('tr');
      tableRow.innerHTML = '<th>Name</th><th>Email</th><th>Service</th><th>Check In</th><th>Check Out</th><th>Message</th>';
      bookinglist.appendChild(tableRow); 

var objectStore = db.transaction("tablebooking").objectStore("tablebooking");
objectStore.openCursor().onsuccess = function(event) {
   var cursor = event.target.result;
   var sessionemail=sessionStorage.getItem("mylogin");
   if (cursor) {
	   
	   if(cursor.value.session==sessionemail)
	   {
	   
				 var tableRow = document.createElement('tr');
      tableRow.innerHTML = '<td>' + cursor.value.name + '</td>'
                           + '<td>' + cursor.value.email + '</td>'
						    + '<td>' + cursor.value.room + '</td>'
							+ '<td>' + cursor.value.check_in + '</td>'
							+ '<td>' + cursor.value.check_out + '</td>'
                           + '<td>' + cursor.value.message + '</td>';
      bookinglist.appendChild(tableRow);   
	   }
	    
	  
      cursor.continue();
   } 
};

}


         function adduser() {
			 
			var name= document.getElementById('name').value;	 
			var email= document.getElementById('email').value;	 
			var url= document.getElementById('url').value;
			var gender= document.getElementById('gender').value;
			var date_birth= document.getElementById('date_birth').value;	 
			var comment= document.getElementById('comment').value;	 
			var password= document.getElementById('password').value;
				 
				 
				 
				 
            var request = db.transaction(["tableuser"], "readwrite")
            .objectStore("tableuser")
            .add({id:email,name: name, email: email, password: password, url: url , gender: gender,  date_birth: date_birth, comment:comment, status:"0"});
            
            request.onsuccess = function(event) {
               alert("You are registered successfully!");
            };
            
            request.onerror = function(event) {
               alert("Unable to register with us! ");
            }
         }
		 
		 
         function loginuser(e) {
			 
			var username= document.getElementById('username').value;	 
			var userpassword= document.getElementById('userpassword').value;	 
			 

			var transaction = db.transaction(["tableuser"]); //readonly
			var objectStore = transaction.objectStore("tableuser");
			var request = objectStore.get(username);  
			request.onsuccess = function(evt) {  
			
			if(request.result.password==userpassword)
			{
				sessionStorage.setItem("mylogin", username);
				
				alert("User successfully Login!");
				window.location('mypage.html');
				  
			}
			else
			{
				alert("Wrong username or password!");
			}
			
			};


         }
		 
		 
		 function addcontactdata()
		 {
			 //alert("sdfsdf");
			 
			if (sessionStorage['mylogin']) {	
			 
			var name= document.getElementById('name').value;	 
			var email= document.getElementById('email').value;	 
			var subject= document.getElementById('subject').value;
			var message= document.getElementById('message').value;

			var sessionemail=sessionStorage.getItem("mylogin");

            var request = db.transaction(["tablecontact"], "readwrite")
            .objectStore("tablecontact")
            .add({session:sessionemail,name: name, email: email, subject: subject, message: message});
            
            request.onsuccess = function(event) {
               alert("Your query has been submitted ! we will get back to you!");
            };
            
            request.onerror = function(event) {
               alert("Unable to add the data! ");
            }

			}
			else
			{
				alert("Please Login First!");
			}


		 }
		 
		 
		 function addbookdata()
		 {
			 if (sessionStorage['mylogin']) {
			var name= document.getElementById('name').value;	 
			var email= document.getElementById('email').value;	 
			var room= document.getElementById('room').value;
			var check_in= document.getElementById('check_in').value;
			var check_out= document.getElementById('check_out').value;
			var message= document.getElementById('message').value;
			
			
			var sessionemail=sessionStorage.getItem("mylogin");

            var request = db.transaction(["tablebooking"], "readwrite")
            .objectStore("tablebooking")
            .add({session:sessionemail,name: name, email: email, room: room, check_in: check_in,check_out:check_out,message:message});
            
            request.onsuccess = function(event) {
               alert("Your room has been booked!");
            };
            
            request.onerror = function(event) {
               alert("Unable to add the data! ");
            }
			}
			else
			{
				alert("Please Login First!");
			}
 }
		 
function loginout()
{
	sessionStorage.removeItem('mylogin');
	alert("logout successfully");
	location.href="index.html";
}
	
		 
		 