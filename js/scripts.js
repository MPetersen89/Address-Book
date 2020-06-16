// Business Logic for Contacts ---------------------
function Contact(firstName, lastName, phone, email) {
  this.firstName = firstName
  this.lastName = lastName
  this.phone = phone
  this.email = email
};

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

AddressBook.prototype.findContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {  
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }                      
  };
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {  
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }               
  };
  return false;
};

// Business Logic for Address Book ---------------------
function AddressBook() {
  this.contacts=[];
  this.currentID=0;
};

AddressBook.prototype.assignID = function(currentID) {
  this.currentID += 1;
  return this.currentID;
};

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignID();  
  this.contacts.push(contact);
};

// User Interface Logic ------------------------
let addressBook = new AddressBook();

function displayContactDetails(adressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactID) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    // console.log("The ID of this <li> is " + this.id + ".");
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}

$(document).ready(function() {
  attachContactListeners();
  $("form#inputContact").submit(function(event) {
    event.preventDefault()
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhone = $("input#new-phone-number").val();
    const inputtedEmail = $("input#new-email-address").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    let contact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhone, inputtedEmail);
    console.log(contact);
    addressBook.addContact(contact);
    console.log(addressBook.contacts);
    displayContactDetails(addressBook);
    // $(".currentContacts").show();
    // $("#contactOutput").append("<li>" + addressBook.contact + "</li>");
  });
})


// function addInfoToArray(firstName, lastName, phone, email) {
//   let array = [];
//   array.push(firstName);
//   array.push(lastName);
//   array.push(phone);
//   array.push(email);

//   return array
// }

// addInfoToArray($("#firstName").val(), )



// let addressBook = new AddressBook();

// let newContact = new Contact();

