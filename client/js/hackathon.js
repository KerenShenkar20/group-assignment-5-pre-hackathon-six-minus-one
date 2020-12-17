
$(document).ready(function () {
    getAllUsers();
    operationsListeners();
});

function getAllUsers() {
    $.ajax({
        url: 'https://help-the-helpless.herokuapp.com/api/users',
        type: 'GET',
        success: function (users) {
            recreateTable(users);
        }
    });
}


function updateUserById(userId, jsonFile) {
    $.ajax({
        url: `https://help-the-helpless.herokuapp.com/api/users/${userId}`,
        type: 'PUT',
        data: jsonFile,
        success: function (response) {
            console.log(response);
        }
    });
}

function recreateTable(users) {
    $("tbody").empty().remove();
    const usersLen = users.length;
    if (usersLen) {
        $('table').append('<tbody></tbody>');
        for (let i = 0; i < usersLen; i++) {
            let tableRow = "<tr><td>$userId</td><td>$first_name</td><td>$last_name</td><td>$email</td><td>$gender</td><td><img src='$avatar' alt='Avatar' class='avatar'></td><td>$job</td></tr>";
            tableRow = tableRow.replace("$userId", users[i].id);
            tableRow = tableRow.replace("$first_name", users[i].first_name);
            tableRow = tableRow.replace("$last_name", users[i].last_name);
            tableRow = tableRow.replace("$email", users[i].email);
            tableRow = tableRow.replace("$gender", users[i].gender);
            tableRow = tableRow.replace("$avatar", users[i].avatar);
            tableRow = tableRow.replace("$job", users[i].job);
            $("tbody").append(tableRow);
            $('table tr:last').css("color", users[i].color); 
        }
    }
}

function getAllUsersByFilter(str) {
    $.ajax({
        url: `https://help-the-helpless.herokuapp.com/api/users${str}`,
        type: 'GET',
        success: function(users) {
            recreateTable(users);
        }
    });
}



function cleanUpdateData(data) {
    const obj = data;
    for (var propName in obj) {
        if (obj[propName] === '') {
          delete obj[propName];
        }
      }
    return obj;
}


function operationsListeners() {

    $("#searchUsers").click(() => {
        const gender = $("input[name=gridRadios]:checked").val()
        const email = $("#inputEmail").val();
        const job = $("#inputJob").val();
        let str = "?";
        if(gender)
        str += `gender=${gender}`;
        if(email)
        str += `&email=${email}`;
        if(job)
        str += `&job=${job}`;
        else if(!gender && !email && !job){
            str = "";
        }
        getAllUsersByFilter(str);
    });

    $("#updateUser").click(() => {
        const id = $("#inputId").val();
        const fn = $("#inputFN").val();
        const ln = $("#inputLN").val();
        const email = $("#inputEmail").val();
        const color = $("#inputColor").val();
        const job = $("#inputJob").val();
        const gender = $('input[name=gridRadios]:checked').val(); 
        const userObj = {
            id,
            job,
            email,
            color,
            gender,
            first_name: fn,
            last_name: ln,
        }
        updateUserById(id, cleanUpdateData(userObj) );
    });
}


