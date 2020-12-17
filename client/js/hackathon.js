$(document).ready(function () {
    getAllUsers();
    operationsListeners();
});

function getAllUsers() {
    $.ajax({
        url: 'http://localhost:3000/api/users',
        type: 'GET',
        success: function (users) {
            recreateTable(users);
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

function operationsListeners() {}