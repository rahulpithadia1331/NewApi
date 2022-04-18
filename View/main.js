const tabledata = document.querySelector('.post-list')
const addTableData = document.querySelector('.add-post-form')
const MemberId = document.getElementById('MemberId')
const MemberName = document.getElementById('MemberName')
const btnSubmit = document.querySelector('.btn')
let output = "";
const url = 'http://localhost:5000/members'

let tableheader = `<table class="table table-dark table-striped">

<thead>
    <tr>
        <th scope="col">Id</th>
        <th scope="col">Name</th>
        <th colspan="3"></th>
    </tr>
</thead>`

let tableFoot = "</table>"

function renderData(data) {
    data.forEach(post => {
        output += `
        
     <tr>
     <td id="Id">${post.Id}</td>
     <td id="Name">${post.Name} </td>
     <td data-id=${post.Id} data-name=${post.Name}> <a href="#" class="card-link" id="editData">Edit</a> </td>
     <td  data-id=${post.Id}><a href="#" class="card-link" id="deleteData">Delete</a> </td>
     </tr>`;


    })
    tabledata.innerHTML = tableheader + output + tableFoot
}



fetch(url)
    .then(res => res.json())
    .then(data => renderData(data))


tabledata.addEventListener('click', (e) => {
    e.preventDefault();
    let deleteData = e.target.id == 'deleteData'
    let editData = e.target.id == 'editData'

    let Id = e.target.parentElement.dataset.id
    let Name = e.target.parentElement.dataset.name
    // console.log(Id)
    // console.log(Name)

    if (deleteData) {
        fetch(`${url}/${Id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => location.reload())
    }

    if (editData) {
        const parent = e.target.parentElement;
        let idData = Id
        let nameData = Name

        MemberId.value = idData
        MemberName.value = nameData

    }
    btnSubmit.addEventListener('click', () => {
        fetch(`${url}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                Id: MemberId.value,
                Name: MemberName.value
            })
        })
            .then(res => res.json())
            .then(() => location.reload())
    })
})



addTableData
    .addEventListener('submit', (e) => {
        e.preventDefault()

        if(MemberId.value){
            fetch(`${url}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
    
                },
                body: JSON.stringify({
                    Id: MemberId.value,
                    Name: MemberName.value
                })
            })
                .then(res => res.json())
                .then(() => location.reload())
        } else{


        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                Id: MemberId.value,
                Name: MemberName.value
            }),

        })
            .then(res => res.json())
            .then(data => {
                const dataArr = [];
                dataArr.push(data);
                renderData(dataArr)
                location.reload()
                location.replace()
            })
        }

    });

