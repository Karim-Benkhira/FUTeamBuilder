const playerForm = document.getElementById('player-form');
        const fieldContainer = document.getElementById('field-container');
        const formationSelect = document.getElementById('formation-select');
        const benchContainer = document.getElementById('bench-container');
        const subsContainer = document.getElementById('subs');  
        const playerTypeSelect = document.getElementById('player-type');

        const formations = {
            '4-3-3': {
                'gk': { top: '85%', left: '47%' },
                'cb1': { top: '70%', left: '28%' },
                'cb2': { top: '70%', left: '65%' },
                'lb': { top: '65%', left: '8%' },
                'rb': { top: '65%', left: '85%' },
                'cm1': { top: '50%', left: '25%' },
                'cm2': { top: '45%', left: '47%' },
                'cm3': { top: '50%', left: '68%' },
                'lw': { top: '30%', left: '18%' },
                'rw': { top: '30%', left: '75%' },
                'st': { top: '20%', left: '47%' }
            },
            '4-4-2': {
                'gk': { top: '85%', left: '47%' },
                'cb1': { top: '70%', left: '28%' },
                'cb2': { top: '70%', left: '65%' },
                'lb': { top: '65%', left: '8%' },
                'rb': { top: '65%', left: '85%' },
                'cm1': { top: '35%', left: '28%' },
                'cm2': { top: '35%', left: '65%' },
                'lm': { top: '40%', left: '8%' },
                'rm': { top: '40%', left: '85%' },
                'lw': { top: '10%', left: '25%' },
                'rw': { top: '10%', left: '68%' }
            }
        };

        function toggleSection() {
            const section = document.getElementById('additional-stats');
            section.style.display = section.style.display === 'none' ? 'block' : 'none';
        }
        

        function formation() {
            const formationselect = document.getElementById("formation-select");
            
            formationSelect.addEventListener("change", () => {

                document.querySelectorAll(".player-position").forEach((card, index) => {
                    if (formationSelect.value === '4-3-3') {
                        let currentplayerposition = Object.keys(formations["4-3-3"])[index];
                        
                        card.style.top = formations["4-3-3"][currentplayerposition].top;
                        card.style.left = formations["4-3-3"][currentplayerposition].left;

                        card.querySelector(".position").textContent = currentplayerposition;
                    } else {
                        let currentplayerposition = Object.keys(formations["4-4-2"])[index];
                        
                        card.style.top = formations["4-4-2"][currentplayerposition].top;
                        card.style.left = formations["4-4-2"][currentplayerposition].left;

                        card.querySelector(".position").textContent = currentplayerposition;
                    }
                })
            })
        }
        formation();

        function createPlayerCard(playerName, playerPosition, playerRating, selectedFormation, playerType,playerCountry,playerimage,playerpace,playershooting,playerpassing,playerdribbling,playerdefending,playerphysical) {

            const playerPos = document.createElement('div');
            // playerPos.classList.add('player-position');
            playerPos.classList.add(playerType === 'starting' ? 'player-position' : 'bench-player');
            playerPos.innerHTML = `
                <img src="${playerimage}" alt="${playerName}" title="${playerName} - ${playerPosition} - ${playerRating}">
                <h4>${playerName}</h4>
                <div class="Postyle">
                <p class="position">${playerPosition}</p>
                <p>${playerRating}</p>
                <p>${playerCountry}</p>
                </div>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
                <div class="additional-stats" style="display: none;">
                <p>Pace: ${playerpace}</p>
                <p>Shooting: ${playershooting}</p>
                <p>Passing: ${playerpassing}</p>
                <p>Dribbling: ${playerdribbling}</p>
                <p>Defending: ${playerdefending}</p>
                <p>Physical: ${playerphysical}</p>
                </div>
            `;
            
            playerPos.addEventListener('click', function(event) {
                event.stopPropagation();
            
                const stats = playerPos.querySelector('.additional-stats');
                const image = playerPos.querySelector('img'); 
                const name = playerPos.querySelector('h4'); 
                const postyle = playerPos.querySelector('.Postyle');
                const editButton = playerPos.querySelector('.edit-button'); 
                const deleteButton = playerPos.querySelector('.delete-button'); 
            
                
                if (stats.style.display === 'none') {
                    stats.style.display = 'block';
                    if (image) image.style.display = 'none';
                    if (name) name.style.display = 'none';
                    if (postyle) postyle.style.display = 'none';
                    if (editButton) editButton.style.display = 'none';
                    if (deleteButton) deleteButton.style.display = 'none';
                } else {
                    stats.style.display = 'none';
                    if (image) image.style.display = 'block';
                    if (name) name.style.display = 'block';
                    if (postyle) postyle.style.display = 'block';
                    if (editButton) editButton.style.display = 'inline-block';
                    if (deleteButton) deleteButton.style.display = 'inline-block';
                }
            });
            
            
            
            playerPos.querySelector('.edit-button').addEventListener('click', function(event) {
                event.stopPropagation();
                document.getElementById('player-name').value = playerName;
                document.getElementById('player-position').value = playerPosition;
                document.getElementById('player-rating').value = playerRating;
                document.getElementById('player-type').value = playerType;
                document.getElementById('player-country').value = playerCountry;
                document.getElementById('player-image').value = playerimage;
                document.getElementById('player-pace').value = playerpace;
                document.getElementById('player-shooting').value = playershooting;
                document.getElementById('player-passing').value = playerpassing;
                document.getElementById('player-dribbling').value = playerdribbling;
                document.getElementById('player-defending').value =playerdefending;
                document.getElementById('player-physical').value = playerphysical;
                playerPos.remove();
            });

            playerPos.querySelector('.delete-button').addEventListener('click', function() {
                // Delete player card
                playerPos.remove();
            });

            let exist = false; // Initialize the exist flag
            let positions = fieldContainer.querySelectorAll(".position");

            // Check if the position is already taken
            positions.forEach(pos => {
                if (pos.textContent === playerPosition) {
                    exist = true;
                }
            });

            if (playerPos.classList.contains("player-position") && !exist) {
                // Add to field if position is available
                const position = formations[selectedFormation][playerPosition.toLowerCase()];
                if (position) {
                    playerPos.style.top = position.top;
                    playerPos.style.left = position.left;

                    // Add player to the field container
                    fieldContainer.appendChild(playerPos);
                } else {
                    alert('Invalid position for the selected formation!');
                }
            } else {
                // If position is already taken, move player to bench
                playerPos.classList.remove("player-position");
                playerPos.classList.add("bench-player");
                playerType = "bench";
                subsContainer.appendChild(playerPos);
            }

            document.getElementById('player-name').value = "";
            document.getElementById('player-type').value = "bench";
            document.getElementById('player-rating').value = "";
            document.getElementById('player-position').value = "gk"
        }

        playerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Get form values
            const playerName = document.getElementById('player-name').value;
            const playerPosition = document.getElementById('player-position').value;
            const playerRating = document.getElementById('player-rating').value;
            const playerCountry = document.getElementById('player-country').value;
            const playerimage = document.getElementById('player-image').value;
            const playerpace = document.getElementById('player-pace').value;
            const playershooting = document.getElementById('player-shooting').value;
            const playerpassing = document.getElementById('player-passing').value;
            const playerdribbling = document.getElementById('player-dribbling').value;
            const playerdefending = document.getElementById('player-defending').value;
            const playerphysical = document.getElementById('player-physical').value;
            const selectedFormation = formationSelect.value;
            const playerType = playerTypeSelect.value;
            
            if (!playerName.trim()) {
                alert('Player name cannot be empty!');
                return;
            }
        
            if (isNaN(playerRating) || playerRating < 0 || playerRating > 100) {
                alert('Player rating must be a number between 0 and 100.');
                return;
            }
        
            if (!formations[selectedFormation][playerPosition.toLowerCase()] && playerType === 'starting') {
                alert('Invalid position for the selected formation!');
                return;
            }
            createPlayerCard(playerName, playerPosition, playerRating, selectedFormation, playerType, playerCountry,playerimage,playerpace,playershooting,playerpassing,playerdribbling,playerdefending,playerphysical);
        });