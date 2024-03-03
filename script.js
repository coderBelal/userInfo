function validateForm() {
  var name = document.getElementById("name").value;
  var age = document.getElementById("age").value;
  var address = document.getElementById("address").value;
  var email = document.getElementById("email").value;
  if (name == "") {
    alert("name is required");
    return false;
  }
  if (age == "") {
    alert("Age is required");
    return false;
  } else if (age < 0) {
    alert("Age Must Be Positive Number");
  }
  if (address == "") {
    alert("Address Is Required");
    return false;
  }
  if (email == "") {
    alert("Email Is Required");
    return false;
  }
  if (!email.includes("@")) {
    alert("Email Is Invalid");
    return false;
  }
  return true;
}
function showData() {
  var peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }
  var html = "";
  peopleList.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.age + "</td>";
    html += "<td>" + element.address + "</td>";
    html += "<td>" + element.email + "</td>";
    html +=
      '<td><button onClick="deleteData(' +
      index +
      ')"class="btn btn-danger" style="margin: 20px;">Delete</button><button onClick="UpdateData(' +
      index +
      ')"class="btn btn-warning">Edit</button></td>';
    html += "</tr>";
  });
  document.querySelector("#crudTable tbody").innerHTML = html;
}
document.onload = showData;
function AddData() {
  if (validateForm() == true) {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
      peopleList = [];
    } else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    peopleList.push({
      name: name,
      age: age,
      address: address,
      email: email,
    });
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";
  }
}
function deleteData(index) {
  var peopleList;
  if (localStorage.getItem("peopleList") == null) {
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }
  peopleList.splice(index, 1);
  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  showData();
}

function UpdateData(index) {
  document.getElementById("Submit").style.display = "none";
  document.getElementById("Update").style.display = "block";
  var peopleList;

  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  if (index >= 0 && index < peopleList.length) {
    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("address").value = peopleList[index].address;
    document.getElementById("email").value = peopleList[index].email;

    document.getElementById("Update").onclick = function () {
      if (validateForm()) {
        peopleList[index].name = document.getElementById("name").value;
        peopleList[index].age = document.getElementById("age").value;
        peopleList[index].address = document.getElementById("address").value;
        peopleList[index].email = document.getElementById("email").value;

        localStorage.setItem("peopleList", JSON.stringify(peopleList));

        showData();

        s;

        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";

        document.getElementById("Submit").style.display = "block";
        document.getElementById("Update").style.display = "none";
      }
    };
  } else {
    console.error("Invalid index:", index);
  }
}
