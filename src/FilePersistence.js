/*
OVERVIEW: 	In this project, you will save contacts to a file. You can use the Synchrnous versions
			of the node.js fs module (such as fs.readFileSync)
*/
var fs = require('fs');

/*
OVERVIEW: 	Add/Append a contact to file.

INPUTS: 	filename - string giving the path of the file.
			contact - A javascript object with {firstName, lastName, phone} as the properties.

OUTPUTS: 	none

NOTES: 		1) All the properties of the contact (firstName, lastName, phone) can have varying lengths - ie contact1.firstname can be 5 chars
				while contact2.firstName can be 15 chars.
			2) A straight-forward approach of just appending contact object to the file alone may not work. You
			   need to think of how read contact(s) will be implemented as well to ensure both Add/Read will work.
*/
exports.AddContact = function(filename, contact){
  var contacts = fs.readFileSync(filename,"utf8");
  if(contacts){
     try{
     	contacts = JSON.parse(contacts);
      contacts.push(contact);
     }
     catch(err)
     {
     	console.log("error in parsing json string");
     }
  }
  else{
    contacts = [];
    contacts.push(contact);    
  }
  fs.writeFileSync(filename,JSON.stringify(contacts));

}

/*
OVERVIEW: 	Read all the contacts from the file.

INPUTS: 	filename - string giving the path of the file.

OUTPUTS: 	Array of javascript objects representing the contacts read from the file.

NOTES: 		1) All the properties of the contact (firstName, lastName, phone) can have varying lengths - ie contact1.firstname can be 5 chars
				while contact2.firstName can be 15 chars.
*/

exports.ReadContacts = function(filename){
  var contacts = fs.readFileSync(filename,"utf8");
  if(contacts){
     try{
     	contacts = JSON.parse(contacts);
     }
     catch(err)
     {
     	console.log("error in parsing json string");
     }
  }
  return contacts;
}

/*
OVERVIEW: 	Update contacts with matching firstName in the file

INPUTS: 	filename - string giving the path of the file.
			contactname - All contacts whose firstName matches this param value should be updated.
			newPhoneNumber - phone of all contacts whose firstName is contactname should be updated to this value.

OUTPUTS: 	None

NOTES: 		You need to only come up with a functionally correct solution and it does not have to be performant. For example: It is
			ok for the entire file to be rewritten as part of this update implementation.

*/
exports.UpdateContact = function(filename, contactname, newPhoneNumber){
  var contacts = fs.readFileSync(filename,"utf8");
  if(contacts){
     try{
     	contacts = JSON.parse(contacts);
      for(i in contacts){
         if(contacts[i].firstName == contactname){
           contacts[i].phone = newPhoneNumber;
        }
      }
       fs.writeFileSync(filename,JSON.stringify(contacts));
     }
     catch(err)
     {
     	console.log("error in parsing json string");
     }
  }
  
}

/*
OVERVIEW: 	Delete contacts with matching firstName in the file

INPUTS: 	filename - string giving the path of the file.
			contactname - All contacts whose firstName matches this param value should be deleted.

OUTPUTS: 	None

NOTES: 		You need to only come up with a functionally correct solution and it does not have to be performant. For example: It is
			ok for the entire file to be rewritten as part of this delete implementation.

*/
exports.DeleteContact = function(filename, contactname){
  var contacts = fs.readFileSync(filename,"utf8");
  if(contacts){
     try{
     	contacts = JSON.parse(contacts);
      for(i in contacts){
        if(contacts[i].firstName == contactname){
           contacts.splice(i, 1);
        }
      }
     fs.writeFileSync(filename,JSON.stringify(contacts));
     }
     catch(err)
     {
     	console.log("error in parsing json string");
     }
  }
  
}

