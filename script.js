

const keyword1 = document.querySelector('#keyword');
keyword1.addEventListener('keyup', function() {
    const keyword = document.querySelector('#keyword').value;
    
    const req = new XMLHttpRequest();

    req.onreadystatechange = function (){
        if(req.readyState === 4){
            if(req.status === 200){
                const data = JSON.parse(req.response);                
                let card = '';
                data.Search.forEach(nm => {
                    card += funcUi(nm);
                });
                // show movie
                document.querySelector('.card-cont').innerHTML = card;

                // Detail Movie
                btnDetilsModal = document.querySelectorAll('.btn-det');
                // looping btn detail
                btnDetilsModal.forEach(btnDets => {
                    // ketika tombol detail di click
                    btnDets.addEventListener('click', function() {
                        const imId = this.dataset.imdbid;
                        const reDet = new XMLHttpRequest();                        

                        reDet.onreadystatechange = function() {
                            if(reDet.readyState === 4){
                                if(reDet.status === 200){
                                    let cardUI = '';
                                    const dataDetUi = JSON.parse(reDet.response);
                                    cardUI += funcUiDet(dataDetUi);
                                    document.querySelector('.modal-body').innerHTML = cardUI;                                    
                                }
                            }
                        }
                    reDet.open('get', 'http://www.omdbapi.com/?apikey=b657b74e&i=' + imId);
                    reDet.send();
                    });
                });

            }else{
                console.log(req.status);
            }
        }
        
    }
    req.open('get', 'http://www.omdbapi.com/?apikey=b657b74e&s=' + keyword);
    req.send();

});

function funcUi(nm){
    return `<div class="col-md-4 mb-3">
    <div class="card" style="width: 18rem;">
        <img src="${ nm.Poster }" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${ nm.Title }</h5>
          <p class="card-text">${ nm.Year }</p>
          <button data-bs-toggle="modal" data-bs-target="#exampleModal" id="btnDet" data-imdbid="${nm.imdbID}" class="btn btn-primary btn-det">Details</button>
        </div>
      </div>
</div>`;
}


function funcUiDet(r){
    document.querySelector('#exampleModalLabel').innerHTML = r.Title;
    
    return `
        <ul class="list-group">
        <li class="list-group-item"><strong>Released</strong> : ${r.Released}</li>
        <li class="list-group-item"><strong>Genre</strong> : ${r.Genre}</li>
        <li class="list-group-item"><strong>Director</strong> : ${r.Director}</li>
        <li class="list-group-item"><strong>Writer</strong> : ${r.Writer}</li>
        <li class="list-group-item"><strong>Actors</strong> : ${r.Actors}</li>
        <li class="list-group-item"><strong>Ratings</strong> : ${r.Ratings[0].Value} <strong>Source : </strong> ${r.Ratings[0].Source}</li>
        <li class="list-group-item"><strong>Plot</strong> : ${r.Plot}</li>
        <li class="list-group-item"><img src="${r.Poster}" width="430px"></li>
      </ul>
        `;

        
}
