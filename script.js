const playerForm = document.getElementById('player-form');
        const fieldContainer = document.getElementById('field-container');
        const formationSelect = document.getElementById('formation-select');
        const benchContainer = document.getElementById('bench-container');
        const playerTypeSelect = document.getElementById('player-type');

        const formations = {
            '4-3-3': {
                'gk': { top: '90%', left: '47%' },
                'cb1': { top: '70%', left: '30%' },
                'cb2': { top: '70%', left: '70%' },
                'lb': { top: '70%', left: '10%' },
                'rb': { top: '70%', left: '90%' },
                'cm1': { top: '50%', left: '30%' },
                'cm2': { top: '50%', left: '50%' },
                'cm3': { top: '50%', left: '70%' },
                'lw': { top: '30%', left: '10%' },
                'rw': { top: '30%', left: '80%' },
                'st': { top: '20%', left: '50%' }
            },
            '4-4-2': {
                'gk': { top: '90%', left: '50%' },
                'cb1': { top: '70%', left: '30%' },
                'cb2': { top: '70%', left: '70%' },
                'lb': { top: '70%', left: '10%' },
                'rb': { top: '70%', left: '90%' },
                'cm1': { top: '50%', left: '30%' },
                'cm2': { top: '50%', left: '70%' },
                'lm': { top: '50%', left: '10%' },
                'rm': { top: '50%', left: '90%' },
                'st1': { top: '30%', left: '40%' },
                'st2': { top: '30%', left: '60%' }
            }
        };

        function createPlayerCard(playerName, playerPosition, playerRating, selectedFormation) {
            const playerPos = document.createElement('div');
            playerPos.classList.add('player-position');
            playerPos.innerHTML = `
                <img src="buno.png" alt="${playerName}" title="${playerName} - ${playerPosition} - ${playerRating}">
                <h4>${playerName}</h4>
                    <p>${playerPosition}</p>
                    <p>${playerRating}</p>
                    <button class="edit-button">Edit</button>
                    <button class="delete-button">Delete</button>
                
            `;

            // Set position based on playerPosition value and selected formation
            const position = formations[selectedFormation][playerPosition.toLowerCase()];
            if (position) {
                playerPos.style.top = position.top;
                playerPos.style.left = position.left;

                // Add player position to the field container
                fieldContainer.appendChild(playerPos);

                // Add event listener to toggle player card visibility
                // playerPos.addEventListener('click',function(){
                //     const playerCard = playerPos.querySelector('.player-card');
                //     playerCard.style.display = playerCard.style.display == 'none' ? 'block' : "none";
                // });
                // Add event listeners to edit and delete buttons
                playerPos.querySelector('.edit-button').addEventListener('click', function() {
                    // Edit player details
                    document.getElementById('player-name').value = playerName;
                    document.getElementById('player-position').value = playerPosition;
                    document.getElementById('player-rating').value = playerRating;
                    fieldContainer.removeChild(playerPos);
                });

                playerPos.querySelector('.delete-button').addEventListener('click', function() {
                    // Delete player card
                    fieldContainer.removeChild(playerPos);
                });

                // Clear form
                playerForm.reset();
            } else {
                alert('Invalid position for the selected formation!');
            }
        }

        playerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Get form values
            const playerName = document.getElementById('player-name').value;
            const playerPosition = document.getElementById('player-position').value;
            const playerRating = document.getElementById('player-rating').value;
            const selectedFormation = formationSelect.value;

            createPlayerCard(playerName, playerPosition, playerRating, selectedFormation);
        });