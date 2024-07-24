document.getElementById('guess-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const guess = document.getElementById('player-guess').value.trim().toLowerCase();
    
    const correctAnswer = 'lebron james';
    const correctData = {
        age: 39,
        number: 23,
        team: 'Lakers',
        position: 'SF',
        conference: 'West'
    };

    if (guess === correctAnswer) {
        for (let i = 1; i <= 5; i++) {
            const ageCell = document.getElementById(`age${i}`);
            const numberCell = document.getElementById(`number${i}`);
            const teamCell = document.getElementById(`team${i}`);
            const positionCell = document.getElementById(`position${i}`);
            const conferenceCell = document.getElementById(`conference${i}`);
            
            if (!ageCell.textContent) {
                ageCell.textContent = correctData.age;
                numberCell.textContent = correctData.number;
                teamCell.textContent = correctData.team;
                positionCell.textContent = correctData.position;
                conferenceCell.textContent = correctData.conference;

                ageCell.classList.add('correct');
                numberCell.classList.add('correct');
                teamCell.classList.add('correct');
                positionCell.classList.add('correct');
                conferenceCell.classList.add('correct');
                
                break;
            }
        }
    } else {
        console.log('Wrong guess, try again!');
    }

    document.getElementById('player-guess').value = '';
});

document.getElementById('new-quiz').addEventListener('click', function() {
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`age${i}`).textContent = '';
        document.getElementById(`number${i}`).textContent = '';
        document.getElementById(`team${i}`).textContent = '';
        document.getElementById(`position${i}`).textContent = '';
        document.getElementById(`conference${i}`).textContent = '';

        document.getElementById(`age${i}`).classList.remove('correct');
        document.getElementById(`number${i}`).classList.remove('correct');
        document.getElementById(`team${i}`).classList.remove('correct');
        document.getElementById(`position${i}`).classList.remove('correct');
        document.getElementById(`conference${i}`).classList.remove('correct');
    }
});

document.getElementById('back-to-main').addEventListener('click', function() {
    window.location.href = '/';
});
