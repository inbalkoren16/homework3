const welcomeScreen = document.getElementById('welcome-screen');
const startBtn = document.getElementById('start-btn');
const bgMusic = document.getElementById('background-music');

startBtn.addEventListener('click', () => {
    //הפעלת המוזיקה
    bgMusic.volume = 0.3;
    bgMusic.play();
    
    //העלמת מסך הפתיחה
    welcomeScreen.style.display = 'none';
});

const allButtons = document.querySelectorAll('.animal');
let currentAudio = null;

// האלמנט שלא נלמד בכיתה: window.speechSynthesis - Web Speech API
// זה ממשק מובנה בדפדפנים שמאפשר המרת טקסט לדיבור
// השתמשתי בו כדי שהדפדפן יקריא את שם החיה בקול רם בכל פעם שהמשתמש לוחץ עליה
function speakAnimalName(animalName) {
    // יצירת אובייקט דיבור חדש עם הטקסט הרצוי
    const msg = new SpeechSynthesisUtterance(animalName);
    
    // הגדרת השפה לאנגלית (כדי שיבטא נכון את שמות החיות)
    msg.lang = 'en-US';
    
    // פקודה למנוע הדיבור של הדפדפן להתחיל לדבר
    window.speechSynthesis.speak(msg);
}

// פונקציה מרכזית להשמעת סאונד
function playSound(animalType) {
    const sound = document.getElementById(animalType + "-sound");
    
    if (sound) {
        // עצירת סאונד קודם
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        currentAudio = sound;
        currentAudio.play();
        speakAnimalName(animalType);
        
        // בונוס: הפעלת אנימציה קטנה לכפתור כדי שנדע מה נלחץ
        animateButton(animalType);
    }
}

// האזנה ללחיצות עכבר
allButtons.forEach(button => {
    button.addEventListener('click', function() {
        const animalType = this.classList[0]; 
        playSound(animalType);
    });
});

//האזנה ללחיצות מקלדת
document.addEventListener('keydown', function(event) {
    // אנחנו בודקים איזו אות נלחצה (הופכים לאות קטנה למקרה שה-CapsLock דלוק)
    const key = event.key.toLowerCase();
    const animalKeys = ['d', 'c', 'f', 'l', 'p', 'b', 'e'];

    if (animalKeys.includes(key)) {
        switch (key) {
            case 'd': playSound('dog'); break;
            case 'c': playSound('cat'); break;
            case 'f': playSound('frog'); break;
            case 'l': playSound('lion'); break;
            case 'p': playSound('pig'); break;
            case 'b': playSound('bear'); break;
            case 'e': playSound('elephant'); break;
        }
    }
    else if (key.length === 1 && key >= 'a' && key <= 'z') {
        alert("אופס! האות " + key.toUpperCase() + " לא קשורה לאף חיה בג'ונגל.");
    }
});

// פונקציה להוספת אפקט ויזואלי בלחיצה
function animateButton(animalType) {
    const activeButton = document.querySelector('.' + animalType);
    if (activeButton) {
        activeButton.classList.add('pressed');
        setTimeout(() => {
            activeButton.classList.remove('pressed');
        }, 200);
    }
}