/* ==========================================================================
   NETFLIX CLONE - APP INTERACTIVITY LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const profileScreen = document.getElementById('profile-screen');
    const mainBrowse = document.getElementById('main-browse');
    const profileCards = document.querySelectorAll('.profile-card:not(.add-profile-card)');
    const headerAvatar = document.getElementById('header-avatar');
    const mainHeader = document.getElementById('main-header');
    
    const searchBtn = document.getElementById('search-btn');
    const searchBox = document.getElementById('search-box');
    const searchInput = document.getElementById('search-input');
    
    const muteBtn = document.getElementById('mute-btn');
    const muteIcon = document.getElementById('mute-icon');
    
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    const movieModal = document.getElementById('movie-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const heroMoreInfoBtn = document.getElementById('hero-more-info');
    const signOutBtn = document.getElementById('sign-out-btn');
    
    // Modal fields
    const modalTitle = document.getElementById('modal-movie-title');
    const modalDesc = document.getElementById('modal-movie-desc');
    const modalBackdrop = document.getElementById('modal-backdrop-img');
    const modalMatch = document.getElementById('modal-match-score');
    const modalRating = document.getElementById('modal-maturity-rating');
    const modalSeasons = document.getElementById('modal-seasons-count');
    const modalGenres = document.getElementById('modal-genres');
    const modalPlayBtn = document.getElementById('modal-play-btn');

    const toast = document.getElementById('toast-message');

    // Mute Status
    let isMuted = true;

    /* ==========================================================================
       1. PROFILE SELECTION & TRANSITIONS
       ========================================================================== */
    profileCards.forEach(card => {
        card.addEventListener('click', () => {
            const avatarImgSrc = card.querySelector('.avatar-img').src;
            const profileNameText = card.querySelector('.profile-name').textContent;
            
            // Apply select profile animation
            card.style.transform = 'scale(1.1)';
            
            // Fade out profile gate
            setTimeout(() => {
                profileScreen.classList.add('fade-out');
                mainBrowse.classList.remove('hidden');
                
                // Set Header Avatar to selected profile
                headerAvatar.src = avatarImgSrc;
                
                // Update dropdown menu visual active item
                updateDropdownActiveProfile(profileNameText, avatarImgSrc);
                
                showToast(`Welcome back, ${profileNameText}!`);
            }, 400);
        });
    });

    // Sign out action (Return to Profile selection screen)
    if (signOutBtn) {
        signOutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mainBrowse.classList.add('hidden');
            profileScreen.classList.remove('fade-out');
            
            // Reset search box
            searchBox.classList.remove('active');
            searchInput.value = '';
            
            // Scroll back to top
            window.scrollTo(0, 0);
            mainHeader.classList.remove('scrolled');
        });
    }

    function updateDropdownActiveProfile(name, imgSrc) {
        const dropdownItems = document.querySelectorAll('.dropdown-item:not(.action-item)');
        dropdownItems.forEach(item => {
            const itemName = item.querySelector('span').textContent;
            if (itemName.toLowerCase() === name.toLowerCase()) {
                item.classList.add('active-user');
            } else {
                item.classList.remove('active-user');
            }
        });
    }

    // Connect dropdown profile items to quickly switch profiles
    const dropdownProfiles = document.querySelectorAll('.dropdown-item:not(.action-item)');
    dropdownProfiles.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const newName = item.querySelector('span').textContent;
            const newImg = item.querySelector('.dropdown-avatar').src;
            
            // Update active indicators
            headerAvatar.src = newImg;
            updateDropdownActiveProfile(newName, newImg);
            showToast(`Switched to profile: ${newName}`);
        });
    });


    /* ==========================================================================
       2. SCROLL HEADER LOGIC
       ========================================================================== */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    });


    /* ==========================================================================
       3. SEARCH EXPANSION LOGIC
       ========================================================================== */
    searchBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        searchBox.classList.toggle('active');
        if (searchBox.classList.contains('active')) {
            searchInput.focus();
        }
    });

    // Prevent search click inside from closing search
    searchBox.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Close search box on click outside
    document.addEventListener('click', () => {
        if (searchBox.classList.contains('active') && searchInput.value.trim() === '') {
            searchBox.classList.remove('active');
        }
    });


    /* ==========================================================================
       4. HERO MUTE BUTTON TOGGLE
       ========================================================================== */
    muteBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        if (isMuted) {
            // Volume Off Icon
            muteIcon.innerHTML = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
            showToast('Audio muted');
        } else {
            // Volume Up Icon
            muteIcon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
            showToast('Audio unmuted');
        }
    });


    /* ==========================================================================
       5. FAQ ACCORDION LOGIC
       ========================================================================== */
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const parentItem = question.parentElement;
            const isActive = parentItem.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // If item wasn't active, open it
            if (!isActive) {
                parentItem.classList.add('active');
            }
        });
    });


    /* ==========================================================================
       6. MOVIE DETAIL MODAL LOGIC
       ========================================================================== */
    // Open Modal when clicking Hero "More Info" button
    if (heroMoreInfoBtn) {
        heroMoreInfoBtn.addEventListener('click', () => {
            populateAndOpenModal({
                title: 'Stranger Things',
                match: '98',
                rating: 'TV-MA',
                seasons: '5 Seasons',
                genres: 'Sci-Fi • Horror • Teen Drama',
                bg: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1600',
                desc: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.'
            });
        });
    }

    // Close Modal actions
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }
    if (movieModal) {
        movieModal.addEventListener('click', (e) => {
            if (e.target === movieModal) {
                closeModal();
            }
        });
    }

    // Modal populate function
    function populateAndOpenModal(data) {
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
        modalBackdrop.style.backgroundImage = `linear-gradient(to top, #181818 0%, rgba(24, 24, 24, 0.4) 60%, rgba(24, 24, 24, 0.7) 100%), url('${data.bg}')`;
        modalMatch.textContent = `${data.match}% Match`;
        modalRating.textContent = data.rating;
        modalSeasons.textContent = data.seasons;
        modalGenres.textContent = data.genres;
        
        // Add dynamic title to play button action inside modal
        modalPlayBtn.setAttribute('onclick', `playMovie('${data.title.replace(/'/g, "\\'")}')`);

        // Show Modal
        movieModal.classList.remove('hidden');
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        movieModal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }

    // Expose open function to movie card hover icons globally
    window.openDetailsModal = function(btn) {
        const card = btn.closest('.movie-card');
        const data = {
            title: card.getAttribute('data-title'),
            match: card.getAttribute('data-match'),
            rating: card.getAttribute('data-rating'),
            seasons: card.getAttribute('data-seasons'),
            genres: card.getAttribute('data-genre'),
            bg: card.getAttribute('data-bg'),
            desc: card.getAttribute('data-description')
        };
        populateAndOpenModal(data);
    };


    /* ==========================================================================
       7. ROW HORIZONTAL SCROLLING LOGIC
       ========================================================================== */
    window.scrollRow = function(btn, direction) {
        const cardsWrapper = btn.parentElement;
        const rowCards = cardsWrapper.querySelector('.row-cards');
        const scrollAmount = rowCards.clientWidth * 0.75;
        
        if (direction === 'left') {
            rowCards.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            rowCards.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };


    /* ==========================================================================
       8. UTILITY ACTION SYSTEM (TOAST)
       ========================================================================== */
    window.playMovie = function(title) {
        showToast(`Playing "${title}"...`);
    };

    function showToast(message) {
        toast.textContent = message;
        toast.classList.remove('hidden');
        
        // Auto hide
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 2500);
    }
});
