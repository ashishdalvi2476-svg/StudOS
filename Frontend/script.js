(function () {
  /* ---------- COURSE DATA ---------- */
  const courses = {
    dl: {
      icon: 'fa-brain',
      title: 'Deep Learning Specialization',
      sub: 'DeepLearning.AI · 4 months',
      qa: [
        { q: 'Your level', icon: 'fa-signal', a: 'You already know Python and basic machine learning concepts. This specialization is the <strong>natural next step</strong> to go from "I understand ML theory" to "I can build real neural networks".' },
        { q: 'Your gap', icon: 'fa-puzzle-piece', a: 'You haven\'t built deep neural networks yet — CNNs, RNNs, or transformers. This course fills that <strong>exact gap</strong> with hands‑on assignments in TensorFlow.' },
        { q: 'Why this course?', icon: 'fa-star', a: 'It gives you <strong>structured, hands-on experience</strong> with the exact tools and techniques used in modern AI — without needing a graduate degree to start. Perfect for building a strong portfolio.' },
        { q: 'Your college', icon: 'fa-university', a: 'Connects directly to your <strong>Neural Networks, Linear Algebra and Probability</strong> subjects. The math you learn in class becomes practical code here.' },
        { q: 'Your next step', icon: 'fa-arrow-right', a: 'After this, you can apply for <strong>AI/ML internships</strong>, build a portfolio of deep learning projects, or move into advanced specializations like NLP or Computer Vision.' }
      ]
    },
    aws: {
      icon: 'fa-cloud',
      title: 'AWS Certified Solutions Architect',
      sub: 'Amazon · 3 months',
      qa: [
        { q: 'Your level', icon: 'fa-signal', a: 'You have full‑stack development experience and understand how web apps are built. Now you need to learn how to <strong>deploy and scale</strong> them on the cloud.' },
        { q: 'Your gap', icon: 'fa-puzzle-piece', a: 'You lack hands‑on cloud experience. This course teaches you <strong>EC2, S3, Lambda, VPC</strong> and how to design resilient, cost‑effective architectures.' },
        { q: 'Why this course?', icon: 'fa-star', a: 'It is one of the <strong>most recognized certifications</strong> in tech, and the hands-on labs let you practice real cloud scenarios. Great for standing out in interviews and proving practical skills.' },
        { q: 'Your college', icon: 'fa-university', a: 'Builds on your <strong>Computer Networks, Operating Systems and DBMS</strong> subjects. You\'ll see how those concepts work at massive cloud scale.' },
        { q: 'Your next step', icon: 'fa-arrow-right', a: 'This certification opens doors to <strong>Cloud Engineer, DevOps and Solutions Architect</strong> roles — and pairs perfectly with your AI goals for deploying models.' }
      ]
    },
    rl: {
      icon: 'fa-robot',
      title: 'Reinforcement Learning',
      sub: 'Stanford Online · 2 months',
      qa: [
        { q: 'Your level', icon: 'fa-signal', a: 'You already understand supervised learning and neural networks. RL is the <strong>advanced frontier</strong> — how agents learn by trial and error.' },
        { q: 'Your gap', icon: 'fa-puzzle-piece', a: 'You haven\'t explored <strong>decision‑making AI</strong> — Q‑learning, policy gradients, or multi‑agent systems. This is the missing piece for truly autonomous AI.' },
        { q: 'Why this course?', icon: 'fa-star', a: 'It pushes you into the <strong>cutting edge of AI</strong> where the most exciting breakthroughs happen. Stanford-quality lectures, and skills that very few students have — a strong differentiator.' },
        { q: 'Your college', icon: 'fa-university', a: 'Connects to <strong>Probability, Markov Chains, Optimization and Game Theory</strong> — concepts you\'ve already seen in your math and AI courses.' },
        { q: 'Your next step', icon: 'fa-arrow-right', a: 'Leads to <strong>research roles, robotics engineering, or advanced AI product development</strong>. Great for a master\'s thesis or a standout final‑year project.' }
      ]
    }
  };

  /* ---------- DOM ELEMENTS ---------- */
  const modal = document.getElementById('courseModal');
  const modalIcon = document.getElementById('modalIcon');
  const modalTitle = document.getElementById('modalTitle');
  const modalSub = document.getElementById('modalSub');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCta = document.getElementById('modalCta');

  const tabsContainer = document.getElementById('mainTabs');
  const tabs = tabsContainer.querySelectorAll('.tab');
  const connectSection = document.getElementById('connectSection');

  const panels = {
    home: document.getElementById('home'),
    dashboard: document.getElementById('dashboard'),
    about: document.getElementById('about'),
    tracker: document.getElementById('tracker'),
    login: document.getElementById('login')
  };

  /* ---------- TAB SWITCHING ---------- */
  function switchTab(tabName) {
    tabs.forEach(t => t.classList.remove('active'));
    Object.values(panels).forEach(p => { if (p) p.classList.remove('active'); });

    if (tabName === 'login') {
      connectSection.style.display = 'none';
      tabsContainer.style.display = 'none';
    } else {
      connectSection.style.display = 'block';
      tabsContainer.style.display = 'flex';
      const targetTab = tabsContainer.querySelector(`.tab[data-tab="${tabName}"]`);
      if (targetTab) targetTab.classList.add('active');
    }

    if (panels[tabName]) panels[tabName].classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchTab(tab.getAttribute('data-tab'));
    });
  });

  /* ---------- CUSTOM MULTI-SELECT SKILLS ---------- */
  const multiselect = document.getElementById('skillsMultiselect');
  const trigger = document.getElementById('skillsTrigger');
  const placeholder = document.getElementById('skillsPlaceholder');
  const menu = document.getElementById('skillsMenu');
  const optionsContainer = document.getElementById('skillsOptions');
  const searchInput = document.getElementById('skillsSearch');
  const skillsSummary = document.getElementById('skillsSummary');

  // Toggle open/close
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    multiselect.classList.toggle('open');
    if (multiselect.classList.contains('open')) {
      setTimeout(() => searchInput.focus(), 100);
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!multiselect.contains(e.target)) {
      multiselect.classList.remove('open');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') multiselect.classList.remove('open');
  });

  // Update trigger placeholder + summary
  function updateSkillsState() {
    const checked = Array.from(optionsContainer.querySelectorAll('input[type="checkbox"]:checked'))
      .map(cb => cb.value);

    if (checked.length === 0) {
      placeholder.textContent = 'Select skills';
      placeholder.classList.remove('has-value');
      skillsSummary.innerHTML = `<i class="fas fa-check-circle" style="color: var(--orange);"></i><span>No skills selected yet</span>`;
    } else {
      placeholder.textContent = checked.length === 1
        ? checked[0]
        : `${checked.length} skills selected`;
      placeholder.classList.add('has-value');
      skillsSummary.innerHTML = `
        <i class="fas fa-check-circle" style="color: var(--orange);"></i>
        <strong>${checked.length} selected:</strong>
        ${checked.map(s => `<span class="selected-skill-tag">${s}</span>`).join('')}
      `;
    }
  }

  optionsContainer.addEventListener('change', updateSkillsState);

  // Search filter
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    optionsContainer.querySelectorAll('.skill-group').forEach(group => {
      let hasVisible = false;
      group.querySelectorAll('.skill-option').forEach(opt => {
        const text = opt.textContent.toLowerCase();
        const match = !q || text.includes(q);
        opt.classList.toggle('hidden', !match);
        if (match) hasVisible = true;
      });
      group.classList.toggle('hidden', !hasVisible);
    });
  });

  // Helper to get selected skills array
  function getSelectedSkills() {
    return Array.from(
      optionsContainer.querySelectorAll(
        'input[type="checkbox"]:checked'
      )
    ).map(cb => {

      const group = cb.closest('.skill-group');

      if (!group) return null;

      const skillName = group.dataset.group;

      const match = cb.value.match(/\(([^)]+)\)$/);

      const level = match ? match[1] : "";

      return {
        skill_name: skillName,
        level_of_skill: level
      };
    }).filter(Boolean);
  }
  /* ---------- TIME CALCULATION ---------- */
  function calculateTimeLeft(year, prepType) {
    const monthMap = {
      '1st Year': { monthsToInternship: 24, monthsToFulltime: 36 },
      '2nd Year': { monthsToInternship: 12, monthsToFulltime: 24 },
      '3rd Year': { monthsToInternship: 0, monthsToFulltime: 12 },
      '4th Year': { monthsToInternship: 0, monthsToFulltime: 0 }
    };

    const target = monthMap[year];
    if (!target) return { text: '—', note: 'Select a valid year.' };

    let monthsLeft;
    let note;

    if (prepType === 'internship') {
      if (year === '3rd Year' || year === '4th Year') {
        monthsLeft = year === '3rd Year' ? 6 : 0;
        note = year === '3rd Year'
          ? 'Internship season is live now! Focus on applications and interview prep.'
          : 'Internship window has largely passed for most companies. Consider full-time prep.';
      } else {
        monthsLeft = target.monthsToInternship;
        note = `Internship recruitment starts in 3rd year. You have ${monthsLeft} months to build skills and projects.`;
      }
    } else {
      if (year === '4th Year') {
        monthsLeft = 3;
        note = 'Placement season is live now. Polish your resume and prepare for drives.';
      } else {
        monthsLeft = target.monthsToFulltime;
        note = `Full-time drives begin in 4th year. You have ${monthsLeft} months to prepare.`;
      }
    }

    if (monthsLeft <= 0) {
      return { text: 'Ready now', note };
    }

    const years = Math.floor(monthsLeft / 12);
    const months = monthsLeft % 12;

    let text = '';
    if (years > 0) text += `${years}y `;
    if (months > 0 || years === 0) text += `${months}m`;

    return { text: text.trim(), note };
  }

  /* ---------- HOME BUTTONS ---------- */
  document.getElementById('getStartedBtn').addEventListener('click', () => {
    switchTab('login');
  });

  document.getElementById('aboutUsBtn').addEventListener('click', () => {
    switchTab('about');
  });

  /* ---------- LOGIN BACK ---------- */
  // =========================================================
  // GET SELECTED SKILLS
  // =========================================================

  // =========================================================
  // ONLY ONE LEVEL CAN BE SELECTED FOR A SKILL
  // =========================================================

  optionsContainer.addEventListener('change', (e) => {

    // Ignore anything other than checkboxes
    if (!e.target.matches('input[type="checkbox"]')) {
      return;
    }

    // Find the skill group
    const group = e.target.closest('.skill-group');

    if (!group) {
      return;
    }

    // If the checkbox was checked,
    // uncheck the other levels in the same group
    if (e.target.checked) {

      const checkboxes = group.querySelectorAll(
        'input[type="checkbox"]'
      );

      checkboxes.forEach(cb => {

        if (cb !== e.target) {
          cb.checked = false;
        }

      });
    }

  });


  // =========================================================
  // PROFILE SUBMISSION
  // =========================================================

  document
    .getElementById('loginSubmitBtn')
    .addEventListener('click', async (e) => {

      e.preventDefault();


      // =================================================
      // GET USER INPUT
      // =================================================

      const name = document
        .getElementById('loginName')
        .value
        .trim();

      const email = document
        .getElementById('loginEmail')
        .value
        .trim();

      const year = document
        .getElementById('loginYear')
        .value;

      const goal = document
        .getElementById('loginGoal')
        .value
        .trim();

      const prepRadio = document.querySelector(
        'input[name="prepType"]:checked'
      );

      const skills = getSelectedSkills();


      // Debugging
      console.log("Selected skills:", skills);


      // =================================================
      // VALIDATION
      // =================================================

      if (!name) {
        alert('Please enter your full name.');
        return;
      }

      if (!email) {
        alert('Please enter your email address.');
        return;
      }


      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }


      if (!year) {
        alert(
          'Please select your current studying year.'
        );
        return;
      }


      if (skills.length === 0) {
        alert(
          'Please select at least one skill and its level.'
        );
        return;
      }


      if (!goal) {
        alert(
          'Please select your career goal.'
        );
        return;
      }


      if (!prepRadio) {
        alert(
          'Please select what you are preparing for.'
        );
        return;
      }

      const result = calculateTimeLeft(year, prepRadio.value);


      // =================================================
      // USER DATA
      // =================================================

      const yearMap = {
        "1st Year": 1,
        "2nd Year": 2,
        "3rd Year": 3,
        "4th Year": 4
      };

      const userData = {
        name: name,
        email: email,
        current_year_of_study: yearMap[year],
        goal_in_life: goal
      };


      console.log(
        "User data being sent:",
        userData
      );


      try {

        // =================================================
        // 1. CREATE USER
        // =================================================

        const userResponse = await fetch(
          "http://127.0.0.1:8000/users",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify(userData)
          }
        );


        const userResult =
          await userResponse.json();


        console.log(
          "User backend response:",
          userResult
        );


        // Check user creation
        if (!userResponse.ok) {

          throw new Error(
            userResult.detail ||
            "Failed to create user."
          );
        }


        // =================================================
        // GET GENERATED USER ID
        // =================================================

        const userId =
          userResult.user_id;


        console.log(
          "Created user ID:",
          userId
        );


        if (!userId) {

          throw new Error(
            "User was created, but no user ID was returned."
          );
        }


        // Save user ID for later pages
        localStorage.setItem(
          "user_id",
          userId
        );


        // =================================================
        // 2. SAVE USER SKILLS
        // =================================================

        const skillData = {

          user_id: userId,

          skills: skills

        };


        console.log(
          "Skill data being sent:",
          skillData
        );


        const skillResponse = await fetch(
          "http://127.0.0.1:8000/skills",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify(skillData)
          }
        );


        const skillResult =
          await skillResponse.json();


        console.log(
          "Skills backend response:",
          skillResult
        );


        // Check skill insertion
        if (!skillResponse.ok) {

          throw new Error(
            skillResult.detail ||
            "Failed to save skills."
          );
        }


        // =================================================
        // 3. UPDATE DASHBOARD
        // =================================================

        const result = calculateTimeLeft(
          year,
          prepRadio.value
        );


        document.getElementById(
          'ddName'
        ).textContent = name;


        document.getElementById(
          'ddYear'
        ).textContent =
          year + ' · B.Tech';


        // Convert skill objects into readable text
        document.getElementById(
          'ddSkill'
        ).textContent =
          skills
            .map(
              skill =>
                `${skill.skill_name} (${skill.level_of_skill})`
            )
            .join(', ');


        document.getElementById(
          'ddGoal'
        ).textContent = goal;


        // =================================================
        // SUCCESS MESSAGE
        // =================================================

        const successPopup =
    document.getElementById("successPopup");

const successDetails =
    document.getElementById("successDetails");

successDetails.innerHTML = `
    <strong>👤 Name:</strong> ${name}<br>
    <strong>📧 Email:</strong> ${email}<br>
    <strong>📚 Year:</strong> ${year}<br>

    <strong>💻 Skills:</strong>
    <ul>
        ${skills
            .map(
                skill =>
                    `<li>${skill.skill_name} - ${skill.level_of_skill}</li>`
            )
            .join("")}
    </ul>

    <strong>🎯 Goal:</strong> ${goal}<br>

    <strong>⏳ Time left:</strong> ${result.text}<br>

    <strong>Preparation:</strong>
    ${
        prepRadio.value === "internship"
            ? "Internship (3rd year drive)"
            : "Full-time (4th year drive)"
    }
`;

successPopup.style.display = "flex";


// ===============================
// REDIRECT AFTER 2.5 SECONDS
// ===============================

setTimeout(() => {
    console.log("Redirecting to dashboard...");

    // Hide success popup
    successPopup.style.display = "none";

    // Go to dashboard
    switchTab("dashboard");

}, 2500);

  // =================================================
  // GO TO DASHBOARD
  // =================================================

  switchTab('dashboard');


} catch (error) {

  console.error(
    "Complete error:",
    error
  );

  alert(
    "❌ " +
    (
      error.message ||
      "Something went wrong."
    )
  );

  return;
}

    });

/* ---------- COURSE MODAL ---------- */
document.querySelectorAll('.course-item').forEach(item => {
  item.addEventListener('click', () => {
    const key = item.getAttribute('data-course');
    const data = courses[key];
    if (!data) return;

    modalIcon.innerHTML = `<i class="fas ${data.icon}"></i>`;
    modalTitle.textContent = data.title;
    modalSub.textContent = data.sub;

    modalBody.innerHTML = data.qa.map(block => `
        <div class="qa-block">
          <div class="qa-question">
            <i class="fas ${block.icon}"></i> ${block.q}
          </div>
          <div class="qa-answer">${block.a}</div>
        </div>
      `).join('');

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

modalCloseBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
});

modalCta.addEventListener('click', () => {
  alert(`🚀 Starting learning path for:\n"${modalTitle.textContent}"\n\nConnect your backend here.`);
});

/* ---------- PROFILE DROPDOWN ---------- */
const profileBtn = document.getElementById('profileIconBtn');
const dropdown = document.getElementById('profileDropdown');

profileBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  dropdown.classList.toggle('show');
});

document.addEventListener('click', (e) => {
  if (!dropdown.contains(e.target) && !profileBtn.contains(e.target)) {
    dropdown.classList.remove('show');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') dropdown.classList.remove('show');
});

/* ---------- AI PROMPT BAR ---------- */
const sendBtn = document.getElementById('sendPromptBtn');
const promptInput = document.getElementById('aiPrompt');
if (sendBtn && promptInput) {
  sendBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const text = promptInput.value.trim();
    if (text) {
      alert(`🤖 AI model placeholder\n\nYou asked: "${text}"\n\nConnect your actual AI model here.`);
      promptInput.value = '';
    } else {
      alert('Please type a prompt for the AI.');
    }
  });
  promptInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
  });
}
}) ();