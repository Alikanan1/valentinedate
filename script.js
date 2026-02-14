document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    const yesButton = buttons[0];
    const noButton = buttons[1];
    const header = document.querySelector('header');
    const questionText = document.querySelector('p');
    const main = document.getElementById('main');
    const buttonsContainer = document.getElementById('buttons');
    
    yesButton.id = 'yes-button';
    noButton.id = 'no-button';
    
    // === NO BUTTON: RUN AWAY EFFECT (WINDOW-WIDE) ===
    function moveNoButton() {
        const buttonRect = noButton.getBoundingClientRect();
        
        // Use window dimensions instead of container dimensions
        // We subtract the button size and a 20px padding to keep it visible
        const maxX = window.innerWidth - buttonRect.width - 20;
        const maxY = window.innerHeight - buttonRect.height - 20;
        
        // Generate random position across the whole screen
        const randomX = Math.max(10, Math.random() * maxX);
        const randomY = Math.max(10, Math.random() * maxY);
        
        // Switch to fixed position so it can escape the #main div
        noButton.style.position = 'fixed';
        noButton.style.zIndex = '1000'; // Ensure it stays on top of everything
        noButton.style.left = randomX + 'px';
        noButton.style.top = randomY + 'px';
    }
    
    noButton.addEventListener('mouseover', moveNoButton);
    
    noButton.addEventListener('click', function(event) {
        event.preventDefault();
        moveNoButton();
        
        questionText.textContent = "Nice try! But you can't click the 'No' that easily!";
        questionText.style.color = "#000000";
        
        setTimeout(() => {
            questionText.textContent = "This is a very important question that you should answer carefully (DON'T MESS UP!).";
            questionText.style.color = "rgba(0, 0, 0, 75%)";
        }, 2000);
    });
    
    noButton.addEventListener('touchstart', function(event) {
        event.preventDefault();
        moveNoButton();
    });
    
    // === YES BUTTON: CELEBRATION EFFECT ===
    yesButton.addEventListener('click', function() {
        header.textContent = "YAY! You've made me so happy! 💖";
        questionText.textContent = "Great choice we'll meet tomorrow 💕";
        questionText.style.color = "#000000";
        questionText.style.fontSize = "2rem";
        questionText.style.fontWeight = "bold";
        questionText.style.animation = "textPop 0.5s ease-out";
        
        main.style.backgroundColor = "#FFB6C1";
        main.style.borderColor = "#FF69B4";
        
        // Hide the buttons and the "No" button wherever it ran off to
        buttonsContainer.style.display = 'none';
        noButton.style.display = 'none';
        
        startCelebration();
    });
    
    function startCelebration() {
        const hearts = ['💖', '💕', '💗', '💓', '💘', '💝'];
        const colors = ['#FF6F77', '#FFB6C1', '#FF69B4', '#FF1493', '#DB7093'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.position = 'fixed';
                heart.style.fontSize = Math.random() * 30 + 20 + 'px';
                heart.style.color = colors[Math.floor(Math.random() * colors.length)];
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.top = '100vh';
                heart.style.zIndex = '9999';
                heart.style.pointerEvents = 'none';
                heart.style.opacity = '0.9';
                heart.style.textShadow = '0 0 10px rgba(255,255,255,0.5)';
                
                document.body.appendChild(heart);
                
                const animation = heart.animate([
                    { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                    { transform: `translateY(-${window.innerHeight + 100}px) rotate(${360 + Math.random() * 360}deg)`, opacity: 0 }
                ], {
                    duration: 3000 + Math.random() * 2000,
                    easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
                });
                
                animation.onfinish = () => heart.remove();
            }, i * 100);
        }
        
        main.style.animation = 'pulse 1.5s infinite alternate';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                100% { transform: scale(1.02); box-shadow: 0 15px 40px rgba(255, 105, 180, 0.4); }
            }
            @keyframes textPop {
                0% { transform: scale(0.8); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    yesButton.addEventListener('mouseover', function() {
        if (Math.random() < 0.3) {
            moveNoButton();
        }
    });
});