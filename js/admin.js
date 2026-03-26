const Admin = {
  data: {},
  activeSection: 'dashboard',
  subjects: [],
  chapters: [],
  
  config: {
    dashboard: {
      label: 'Dashboard', icon: '📊',
      render: (panel) => {
        const stats = Admin.calculateStats();
        panel.innerHTML = `
          <div class="admin-header">
            <h1>Welcome, Teacher! 👋</h1>
            <p class="subtitle">Manage all your educational content from one place</p>
          </div>
          
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">📚</div>
              <div class="stat-info">
                <div class="stat-value">${stats.subjects}</div>
                <div class="stat-label">Subjects</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">📖</div>
              <div class="stat-info">
                <div class="stat-value">${stats.chapters}</div>
                <div class="stat-label">Chapters</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🎬</div>
              <div class="stat-info">
                <div class="stat-value">${stats.videos}</div>
                <div class="stat-label">Videos</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">📁</div>
              <div class="stat-info">
                <div class="stat-value">${stats.pdfs}</div>
                <div class="stat-label">PDFs</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🧩</div>
              <div class="stat-info">
                <div class="stat-value">${stats.quizzes}</div>
                <div class="stat-label">Questions</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">👨‍🏫</div>
              <div class="stat-info">
                <div class="stat-value">${stats.teachers}</div>
                <div class="stat-label">Teachers</div>
              </div>
            </div>
          </div>

          <div class="quick-actions">
            <h3>⚡ Quick Actions</h3>
            <div class="quick-grid">
              <button class="quick-card" onclick="Admin.switchSection('addContent')">
                <div class="quick-icon">➕</div>
                <div class="quick-label">Add New Content</div>
              </button>
              <button class="quick-card" onclick="Admin.switchSection('links')">
                <div class="quick-icon">🔗</div>
                <div class="quick-label">Manage Links</div>
              </button>
              <button class="quick-card" onclick="Admin.switchSection('pdfs')">
                <div class="quick-icon">📄</div>
                <div class="quick-label">Upload PDFs</div>
              </button>
              <button class="quick-card" onclick="Admin.switchSection('pyqs')">
                <div class="quick-icon">📝</div>
                <div class="quick-label">Add PYQs</div>
              </button>
            </div>
          </div>
        `;
      }
    },
    
    addContent: {
      label: 'Add Content', icon: '➕',
      render: (panel) => {
        panel.innerHTML = `
          <div class="admin-header">
            <h1>Add New Content</h1>
            <p class="subtitle">Choose what type of content you want to add</p>
          </div>
          
          <div class="content-type-grid">
            <div class="content-type-card" onclick="Admin.showContentForm('video')">
              <div class="type-icon">🎬</div>
              <h3>Video Lesson</h3>
              <p>Add YouTube video links for lessons</p>
            </div>
            <div class="content-type-card" onclick="Admin.showContentForm('notes')">
              <div class="type-icon">📝</div>
              <h3>Study Notes</h3>
              <p>Add notes and explanations</p>
            </div>
            <div class="content-type-card" onclick="Admin.showContentForm('pdf')">
              <div class="type-icon">📄</div>
              <h3>PDF Document</h3>
              <p>Upload PDF notes or worksheets</p>
            </div>
            <div class="content-type-card" onclick="Admin.showContentForm('quiz')">
              <div class="type-icon">🧩</div>
              <h3>Quiz Question</h3>
              <p>Add MCQ questions with answers</p>
            </div>
            <div class="content-type-card" onclick="Admin.showContentForm('pyq')">
              <div class="type-icon">📋</div>
              <h3>Previous Year Question</h3>
              <p>Add PYQs with solutions</p>
            </div>
            <div class="content-type-card" onclick="Admin.showContentForm('paper')">
              <div class="type-icon">📑</div>
              <h3>Question Paper</h3>
              <p>Add sample or board papers</p>
            </div>
          </div>
          
          <div id="contentFormArea" class="form-area"></div>
        `;
      }
    },
    
    links: {
      label: 'Video Links', icon: '�',
      render: (panel) => Admin.renderContentManager(panel, 'video', 'Manage Video Links', 'YouTube Video')
    },
    
    notes: {
      label: 'Notes', icon: '📝',
      render: (panel) => Admin.renderNotesManager(panel)
    },
    
    pdfs: {
      label: 'PDFs', icon: '📁',
      render: (panel) => Admin.renderContentManager(panel, 'pdf', 'Manage PDF Documents', 'PDF')
    },
    
    pyqs: {
      label: 'PYQs', icon: '📋',
      render: (panel) => Admin.renderPYQManager(panel)
    },
    
    papers: {
      label: 'Question Papers', icon: '📑',
      render: (panel) => Admin.renderPaperManager(panel)
    },
    
    quiz: {
      label: 'Quiz Bank', icon: '🧩',
      render: (panel) => Admin.renderQuizManager(panel)
    },
    
    teachers: {
      label: 'Teachers', icon: '👨‍🏫',
      render: (panel) => Admin.renderTeacherManager(panel)
    },
    
    settings: {
      label: 'Settings', icon: '⚙️',
      render: (panel) => {
        panel.innerHTML = `
          <div class="admin-header">
            <h1>Settings</h1>
            <p class="subtitle">Manage your admin preferences</p>
          </div>
          
          <div class="settings-grid">
            <div class="setting-card">
              <h3>💾 Data Management</h3>
              <div class="setting-actions">
                <button class="btn btn-primary" onclick="Admin.exportData()">
                  📥 Export All Data
                </button>
                <button class="btn btn-secondary" onclick="Admin.clearAllData()">
                  🗑️ Clear All Data
                </button>
              </div>
            </div>
            
            <div class="setting-card">
              <h3>🔐 Security</h3>
              <div class="setting-actions">
                <button class="btn btn-secondary" onclick="Admin.logout()">
                  🚪 Logout
                </button>
              </div>
            </div>
          </div>
        `;
      }
    }
  },

  init() {
    if (!this.checkLogin()) return;
    this.loadData().then(() => {
      this.loadSubjectsAndChapters();
      this.renderNav();
      this.renderPanels();
      this.switchSection(this.activeSection);
    });
  },

  loadSubjectsAndChapters() {
    this.subjects = this.data.subjects || [];
    this.chapters = [];
    this.subjects.forEach(subj => {
      if (subj.chapters) {
        subj.chapters.forEach(ch => {
          this.chapters.push({
            id: ch.id,
            title: ch.title,
            subjectId: subj.id,
            subjectName: subj.name
          });
        });
      }
    });
  },

  calculateStats() {
    return {
      subjects: this.data.subjects?.length || 0,
      chapters: this.chapters.length,
      videos: (this.data.videos || []).length,
      pdfs: (this.data.pdfs || []).length,
      quizzes: (this.data.quiz || []).length,
      teachers: (this.data.teachers || []).length
    };
  },

  renderNav() {
    const navEl = document.getElementById('adminNavLinks');
    let html = '';
    for (const sectionId in this.config) {
      const section = this.config[sectionId];
      html += `
        <div class="al-link ${this.activeSection === sectionId ? 'on' : ''}" 
             id="al-${sectionId}" 
             onclick="Admin.switchSection('${sectionId}')">
          <span class="al-icon">${section.icon}</span>
          <span class="al-label">${section.label}</span>
        </div>
      `;
    }
    navEl.innerHTML = html;
  },

  renderPanels() {
    const panelsEl = document.getElementById('adminPanels');
    let html = '';
    for (const sectionId in this.config) {
      html += `<div class="a-panel ${this.activeSection === sectionId ? 'on' : ''}" id="ap-${sectionId}"></div>`;
    }
    panelsEl.innerHTML = html;
  },

  switchSection(sectionId) {
    this.activeSection = sectionId;
    document.querySelectorAll('.al-link').forEach(el => el.classList.remove('on'));
    document.getElementById(`al-${sectionId}`)?.classList.add('on');

    document.querySelectorAll('.a-panel').forEach(el => el.classList.remove('on'));
    const panel = document.getElementById(`ap-${sectionId}`);
    panel?.classList.add('on');

    // Close mobile navigation when switching sections
    this.closeMobileNav();

    const section = this.config[sectionId];
    if (section?.render) {
      section.render(panel);
    }
  },

  showContentForm(type) {
    const formArea = document.getElementById('contentFormArea');
    if (!formArea) return;
    
    const getSubjectOptions = () => this.subjects.map(s => 
      `<option value="${s.id}">${s.icon || '📚'} ${s.name}</option>`
    ).join('');
    
    const forms = {
      video: `
        <div class="form-card">
          <h3>🎬 Add Video Lesson</h3>
          <div class="form-grid">
            <div class="form-group">
              <label>Subject *</label>
              <select class="fc" id="videoSubject" onchange="Admin.loadChapters('videoSubject', 'videoChapter')">
                <option value="">Select Subject</option>
                ${getSubjectOptions()}
              </select>
            </div>
            <div class="form-group">
              <label>Chapter *</label>
              <select class="fc" id="videoChapter">
                <option value="">Select Chapter</option>
              </select>
            </div>
            <div class="form-group full-width">
              <label>Video Title *</label>
              <input type="text" class="fc" id="videoTitle" placeholder="e.g., Introduction to Trigonometry">
            </div>
            <div class="form-group full-width">
              <label>YouTube Video ID or URL *</label>
              <input type="text" class="fc" id="videoUrl" placeholder="e.g., dQw4w9WgXcQ or full URL">
              <small class="form-help">Paste full YouTube URL or just video ID</small>
            </div>
            <div class="form-group">
              <label>Teacher</label>
              <select class="fc" id="videoTeacher">
                <option value="">Select Teacher</option>
                ${this.getTeacherOptions()}
              </select>
            </div>
            <div class="form-group">
              <label>Video Type</label>
              <select class="fc" id="videoType">
                <option value="oneshot">One Shot</option>
                <option value="revision">Revision</option>
                <option value="detailed">Detailed</option>
              </select>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn btn-primary" onclick="Admin.saveVideo()">💾 Save Video</button>
            <button class="btn btn-secondary" onclick="Admin.previewVideo()">👁️ Preview</button>
          </div>
        </div>
      `,
      
      pdf: `
        <div class="form-card">
          <h3>📄 Add PDF Document</h3>
          <div class="form-grid">
            <div class="form-group">
              <label>Subject *</label>
              <select class="fc" id="pdfSubject" onchange="Admin.loadChapters('pdfSubject', 'pdfChapter')">
                <option value="">Select Subject</option>
                ${getSubjectOptions()}
              </select>
            </div>
            <div class="form-group">
              <label>Chapter</label>
              <select class="fc" id="pdfChapter">
                <option value="">All Chapters</option>
              </select>
            </div>
            <div class="form-group full-width">
              <label>PDF Name *</label>
              <input type="text" class="fc" id="pdfName" placeholder="e.g., NCERT Solutions">
            </div>
            <div class="form-group full-width">
              <label>PDF URL *</label>
              <input type="url" class="fc" id="pdfUrl" placeholder="https://example.com/doc.pdf">
            </div>
            <div class="form-group">
              <label>Category</label>
              <select class="fc" id="pdfCategory">
                <option value="notes">Notes</option>
                <option value="worksheet">Worksheet</option>
                <option value="solution">Solutions</option>
                <option value="pyq">PYQ</option>
              </select>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn btn-primary" onclick="Admin.savePDF()">💾 Save PDF</button>
          </div>
        </div>
      `,
      
      quiz: `
        <div class="form-card">
          <h3>🧩 Add Quiz Question</h3>
          <div class="form-grid">
            <div class="form-group">
              <label>Subject *</label>
              <select class="fc" id="quizSubject" onchange="Admin.loadChapters('quizSubject', 'quizChapter')">
                <option value="">Select Subject</option>
                ${getSubjectOptions()}
              </select>
            </div>
            <div class="form-group">
              <label>Chapter *</label>
              <select class="fc" id="quizChapter">
                <option value="">Select Chapter</option>
              </select>
            </div>
            <div class="form-group full-width">
              <label>Question *</label>
              <textarea class="fc" id="quizQuestion" rows="3" placeholder="Enter question..."></textarea>
            </div>
            <div class="form-group full-width">
              <label>Options * (one per line)</label>
              <textarea class="fc" id="quizOptions" rows="4" placeholder="Option A&#10;Option B&#10;Option C&#10;Option D"></textarea>
            </div>
            <div class="form-group">
              <label>Correct Answer *</label>
              <select class="fc" id="quizAnswer">
                <option value="0">A</option>
                <option value="1">B</option>
                <option value="2">C</option>
                <option value="3">D</option>
              </select>
            </div>
            <div class="form-group">
              <label>Difficulty</label>
              <select class="fc" id="quizDifficulty">
                <option value="easy">Easy</option>
                <option value="medium" selected>Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn btn-primary" onclick="Admin.saveQuiz()">💾 Save & Next</button>
            <button class="btn btn-gh" onclick="Admin.saveQuiz(); Admin.showContentForm('quiz')">➕ Save & Add Another</button>
          </div>
        </div>
      `,
      
      pyq: `
        <div class="form-card">
          <h3>📋 Add Previous Year Question</h3>
          <div class="form-grid">
            <div class="form-group">
              <label>Subject *</label>
              <select class="fc" id="pyqSubject">
                <option value="">Select Subject</option>
                ${getSubjectOptions()}
              </select>
            </div>
            <div class="form-group">
              <label>Year *</label>
              <select class="fc" id="pyqYear">
                <option value="">Select Year</option>
                ${[2024,2023,2022,2021,2020,2019,2018].map(y => `<option value="${y}">${y}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label>Board</label>
              <select class="fc" id="pyqBoard">
                <option value="cbse">CBSE</option>
                <option value="icse">ICSE</option>
                <option value="state">State</option>
              </select>
            </div>
            <div class="form-group full-width">
              <label>Question *</label>
              <textarea class="fc" id="pyqQuestion" rows="4" placeholder="Enter question..."></textarea>
            </div>
            <div class="form-group full-width">
              <label>Solution *</label>
              <textarea class="fc" id="pyqSolution" rows="6" placeholder="Enter solution..."></textarea>
            </div>
            <div class="form-group">
              <label>Marks</label>
              <input type="number" class="fc" id="pyqMarks" placeholder="e.g., 5">
            </div>
          </div>
          <div class="form-actions">
            <button class="btn btn-primary" onclick="Admin.savePYQ()">💾 Save PYQ</button>
          </div>
        </div>
      `,
      
      paper: `
        <div class="form-card">
          <h3>📑 Add Question Paper</h3>
          <div class="form-grid">
            <div class="form-group full-width">
              <label>Title *</label>
              <input type="text" class="fc" id="paperTitle" placeholder="e.g., CBSE Sample Paper 2024">
            </div>
            <div class="form-group">
              <label>Subject *</label>
              <select class="fc" id="paperSubject">
                <option value="">Select Subject</option>
                ${getSubjectOptions()}
              </select>
            </div>
            <div class="form-group">
              <label>Year</label>
              <input type="number" class="fc" id="paperYear" placeholder="2024">
            </div>
            <div class="form-group">
              <label>Type</label>
              <select class="fc" id="paperType">
                <option value="sample">Sample</option>
                <option value="board">Board</option>
                <option value="preboard">Pre-Board</option>
                <option value="mock">Mock</option>
              </select>
            </div>
            <div class="form-group full-width">
              <label>PDF URL *</label>
              <input type="url" class="fc" id="paperUrl" placeholder="https://example.com/paper.pdf">
            </div>
          </div>
          <div class="form-actions">
            <button class="btn btn-primary" onclick="Admin.savePaper()">💾 Save Paper</button>
          </div>
        </div>
      `
    };
    
    formArea.innerHTML = forms[type] || '';
    formArea.scrollIntoView({ behavior: 'smooth' });
  },

  loadChapters(subjectSelectId, chapterSelectId) {
    const subjectId = document.getElementById(subjectSelectId).value;
    const chapterSelect = document.getElementById(chapterSelectId);
    const subject = this.subjects.find(s => s.id === subjectId);
    
    if (subject?.chapters) {
      chapterSelect.innerHTML = `
        <option value="">Select Chapter</option>
        ${subject.chapters.map(ch => `<option value="${ch.id}">${ch.title}</option>`).join('')}
      `;
    }
  },

  getTeacherOptions() {
    return (this.data.teachers || []).map(t => 
      `<option value="${t.name}::${t.channel}">${t.name}</option>`
    ).join('');
  },

  saveVideo() {
    const videoId = this.extractVideoId(document.getElementById('videoUrl').value);
    if (!videoId) { alert('Please enter a valid YouTube URL or video ID'); return; }
    
    const video = {
      id: 'vid_' + Date.now(),
      subject: document.getElementById('videoSubject').value,
      chapter: document.getElementById('videoChapter').value,
      title: document.getElementById('videoTitle').value,
      videoId: videoId,
      teacher: document.getElementById('videoTeacher').value,
      type: document.getElementById('videoType').value,
      createdAt: new Date().toISOString()
    };
    
    if (!video.subject || !video.chapter || !video.title) {
      alert('Please fill all required fields (*)!'); return;
    }
    
    if (!this.data.videos) this.data.videos = [];
    this.data.videos.push(video);
    this.saveData();
    alert('✅ Video saved successfully!');
    document.getElementById('videoTitle').value = '';
    document.getElementById('videoUrl').value = '';
  },

  savePDF() {
    const pdf = {
      id: 'pdf_' + Date.now(),
      subject: document.getElementById('pdfSubject').value,
      chapter: document.getElementById('pdfChapter').value,
      name: document.getElementById('pdfName').value,
      url: document.getElementById('pdfUrl').value,
      category: document.getElementById('pdfCategory').value,
      createdAt: new Date().toISOString()
    };
    
    if (!pdf.subject || !pdf.name || !pdf.url) {
      alert('Please fill all required fields (*)!'); return;
    }
    
    if (!this.data.pdfs) this.data.pdfs = [];
    this.data.pdfs.push(pdf);
    this.saveData();
    alert('✅ PDF saved successfully!');
    this.switchSection('pdfs');
  },

  saveQuiz() {
    const optionsText = document.getElementById('quizOptions').value;
    const options = optionsText.split('\n').filter(o => o.trim());
    
    if (options.length < 2) { alert('Please provide at least 2 options'); return; }
    
    const quiz = {
      id: 'quiz_' + Date.now(),
      subject: document.getElementById('quizSubject').value,
      chapter: document.getElementById('quizChapter').value,
      q: document.getElementById('quizQuestion').value,
      options: options,
      ans: parseInt(document.getElementById('quizAnswer').value),
      difficulty: document.getElementById('quizDifficulty').value,
      createdAt: new Date().toISOString()
    };
    
    if (!quiz.subject || !quiz.chapter || !quiz.q) {
      alert('Please fill all required fields (*)!'); return;
    }
    
    if (!this.data.quiz) this.data.quiz = [];
    this.data.quiz.push(quiz);
    this.saveData();
    alert('✅ Quiz question saved!');
  },

  savePYQ() {
    const pyq = {
      id: 'pyq_' + Date.now(),
      subject: document.getElementById('pyqSubject').value,
      year: document.getElementById('pyqYear').value,
      board: document.getElementById('pyqBoard').value,
      question: document.getElementById('pyqQuestion').value,
      solution: document.getElementById('pyqSolution').value,
      marks: document.getElementById('pyqMarks').value,
      createdAt: new Date().toISOString()
    };
    
    if (!pyq.subject || !pyq.year || !pyq.question || !pyq.solution) {
      alert('Please fill all required fields (*)!'); return;
    }
    
    if (!this.data.pyqs) this.data.pyqs = [];
    this.data.pyqs.push(pyq);
    this.saveData();
    alert('✅ PYQ saved successfully!');
    this.switchSection('pyqs');
  },

  savePaper() {
    const paper = {
      id: 'paper_' + Date.now(),
      title: document.getElementById('paperTitle').value,
      subject: document.getElementById('paperSubject').value,
      year: document.getElementById('paperYear').value,
      type: document.getElementById('paperType').value,
      url: document.getElementById('paperUrl').value,
      createdAt: new Date().toISOString()
    };
    
    if (!paper.title || !paper.subject || !paper.url) {
      alert('Please fill all required fields (*)!'); return;
    }
    
    if (!this.data.papers) this.data.papers = [];
    this.data.papers.push(paper);
    this.saveData();
    alert('✅ Question paper saved successfully!');
    this.switchSection('papers');
  },

  extractVideoId(url) {
    if (!url) return null;
    if (url.length === 11 && !url.includes('/')) return url;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/);
    return match ? match[1] : null;
  },

  previewVideo() {
    const videoId = this.extractVideoId(document.getElementById('videoUrl').value);
    if (videoId) { window.open(`https://youtube.com/watch?v=${videoId}`, '_blank'); }
    else { alert('Please enter a valid YouTube URL first'); }
  },

  tryLogin() {
    const pass = document.getElementById('adminPass').value;
    if (pass === '6610') {
      localStorage.setItem('vm_admin_key', pass);
      this.init();
    } else {
      document.getElementById('loginErr').textContent = 'Invalid Access Key';
    }
  },

  logout() {
    localStorage.removeItem('vm_admin_key');
    window.location.reload();
  },

  async loadData() {
    try {
      const response = await fetch('js/data.json');
      const builtInData = await response.json();
      const adminData = JSON.parse(localStorage.getItem('vm_admin_data') || '{}');
      this.data = { ...builtInData, ...adminData };
    } catch (e) {
      console.error("Failed to load data", e);
      this.data = JSON.parse(localStorage.getItem('vm_admin_data') || '{}');
    }
  },

  saveData() {
    localStorage.setItem('vm_admin_data', JSON.stringify(this.data));
    alert('Data saved successfully!');
  },

  exportData() {
    const dataStr = JSON.stringify(this.data, null, 2);
    const blob = new Blob([dataStr], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'class10edu_backup_' + new Date().toISOString().split('T')[0] + '.json';
    a.click();
    URL.revokeObjectURL(url);
  },

  // Content Managers
  renderContentManager(panel, type, title, itemName) {
    const items = this.data[type === 'pdf' ? 'pdfs' : type + 's'] || [];
    const getSubjectName = (id) => {
      const subj = this.subjects.find(s => s.id === id);
      return subj ? subj.name : id;
    };
    const getChapterName = (id) => {
      const ch = this.chapters.find(c => c.id === id);
      return ch ? ch.title : id || 'All Chapters';
    };
    const formatDate = (dateString) => {
      if (!dateString) return '-';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    };
    
    panel.innerHTML = `
      <div class="admin-header">
        <h1>${title}</h1>
        <button class="btn btn-primary btn-sm" onclick="Admin.switchSection('addContent')">➕ Add New</button>
      </div>
      
      <div class="content-table-wrapper">
        <table class="content-table">
          <thead>
            <tr>
              <th>${itemName}</th>
              <th>Subject</th>
              <th>Chapter</th>
              <th>Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${items.map((item, idx) => `
              <tr>
                <td>
                  <div class="item-info">
                    <span class="item-icon">${type === 'video' ? '🎬' : '📄'}</span>
                    <span class="item-name">${item.title || item.name}</span>
                  </div>
                </td>
                <td>${getSubjectName(item.subject)}</td>
                <td>${getChapterName(item.chapter)}</td>
                <td>${formatDate(item.createdAt)}</td>
                <td>
                  <div class="action-btns">
                    ${item.url || item.videoId ? `<button class="btn-icon" onclick="window.open('${item.url || `https://youtube.com/watch?v=${item.videoId}`}', '_blank')" title="Open">🔗</button>` : ''}
                    <button class="btn-icon delete" onclick="Admin.deleteItem('${type === 'pdf' ? 'pdfs' : type + 's'}', ${idx})" title="Delete">🗑️</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        ${items.length === 0 ? `<div class="empty-state">No ${itemName.toLowerCase()}s added yet. <a href="#" onclick="Admin.switchSection('addContent')">Add your first one!</a></div>` : ''}
      </div>
    `;
  },

  renderNotesManager(panel) {
    const notes = this.data.notes || [];
    panel.innerHTML = `
      <div class="admin-header">
        <h1>Study Notes</h1>
        <button class="btn btn-primary btn-sm" onclick="Admin.switchSection('addContent')">➕ Add Notes</button>
      </div>
      <div class="notes-grid">
        ${notes.map((note, idx) => `
          <div class="note-card">
            <div class="note-header">
              <span class="note-subject">${this.getSubjectName(note.subject)}</span>
              <span class="note-date">${this.formatDate(note.createdAt)}</span>
            </div>
            <h4>${note.title}</h4>
            <p class="note-preview">${note.content?.substring(0, 100) || 'No content'}...</p>
            <div class="note-actions">
              <button class="btn btn-sm btn-gh" onclick="Admin.deleteItem('notes', ${idx})">Delete</button>
            </div>
          </div>
        `).join('')}
        ${notes.length === 0 ? '<div class="empty-state">No notes added yet.</div>' : ''}
      </div>
    `;
  },

  renderQuizManager(panel) {
    const quizzes = this.data.quiz || [];
    panel.innerHTML = `
      <div class="admin-header">
        <h1>Quiz Bank</h1>
        <button class="btn btn-primary btn-sm" onclick="Admin.switchSection('addContent')">➕ Add Question</button>
      </div>
      <div class="quiz-stats">
        <span class="stat-pill">Total: ${quizzes.length}</span>
        <span class="stat-pill easy">Easy: ${quizzes.filter(q => q.difficulty === 'easy').length}</span>
        <span class="stat-pill medium">Medium: ${quizzes.filter(q => q.difficulty === 'medium').length}</span>
        <span class="stat-pill hard">Hard: ${quizzes.filter(q => q.difficulty === 'hard').length}</span>
      </div>
      <div class="quiz-list">
        ${quizzes.map((q, idx) => `
          <div class="quiz-item ${q.difficulty}">
            <div class="quiz-main">
              <span class="difficulty-badge ${q.difficulty}">${q.difficulty}</span>
              <p class="quiz-question">${q.q}</p>
              <div class="quiz-meta">${this.getSubjectName(q.subject)} • ${this.getChapterName(q.chapter)}</div>
            </div>
            <div class="quiz-actions">
              <button class="btn btn-sm btn-gh" onclick="Admin.deleteItem('quiz', ${idx})">Delete</button>
            </div>
          </div>
        `).join('')}
        ${quizzes.length === 0 ? '<div class="empty-state">No quiz questions added yet.</div>' : ''}
      </div>
    `;
  },

  renderPYQManager(panel) {
    const pyqs = this.data.pyqs || [];
    panel.innerHTML = `
      <div class="admin-header">
        <h1>Previous Year Questions</h1>
        <button class="btn btn-primary btn-sm" onclick="Admin.switchSection('addContent')">➕ Add PYQ</button>
      </div>
      <div class="pyq-timeline">
        ${pyqs.map((pyq, idx) => `
          <div class="pyq-item">
            <div class="pyq-year">${pyq.year}</div>
            <div class="pyq-content">
              <div class="pyq-subject">${this.getSubjectName(pyq.subject)} • ${pyq.board?.toUpperCase() || 'CBSE'}</div>
              <p class="pyq-question">${pyq.question?.substring(0, 150)}...</p>
              <div class="pyq-actions">
                <button class="btn btn-sm btn-gh" onclick="Admin.deleteItem('pyqs', ${idx})">Delete</button>
              </div>
            </div>
          </div>
        `).join('')}
        ${pyqs.length === 0 ? '<div class="empty-state">No PYQs added yet.</div>' : ''}
      </div>
    `;
  },

  renderPaperManager(panel) {
    const papers = this.data.papers || [];
    panel.innerHTML = `
      <div class="admin-header">
        <h1>Question Papers</h1>
        <button class="btn btn-primary btn-sm" onclick="Admin.switchSection('addContent')">➕ Add Paper</button>
      </div>
      <div class="papers-list">
        ${papers.map((paper, idx) => `
          <div class="paper-card">
            <div class="paper-icon">📑</div>
            <div class="paper-info">
              <h4>${paper.title}</h4>
              <div class="paper-meta">
                <span>${this.getSubjectName(paper.subject)}</span>
                <span>${paper.year}</span>
                <span class="paper-type">${paper.type}</span>
              </div>
            </div>
            <div class="paper-actions">
              <a href="${paper.url}" target="_blank" class="btn btn-sm btn-primary">Open</a>
              <button class="btn btn-sm btn-gh" onclick="Admin.deleteItem('papers', ${idx})">Delete</button>
            </div>
          </div>
        `).join('')}
        ${papers.length === 0 ? '<div class="empty-state">No question papers added yet.</div>' : ''}
      </div>
    `;
  },

  renderTeacherManager(panel) {
    const teachers = this.data.teachers || [];
    panel.innerHTML = `
      <div class="admin-header">
        <h1>Teachers</h1>
        <button class="btn btn-primary btn-sm" onclick="Admin.showAddTeacherForm()">➕ Add Teacher</button>
      </div>
      <div class="teachers-grid-admin">
        ${teachers.map((t, idx) => `
          <div class="teacher-card-admin" style="border-left-color: ${t.color || '#6366F1'}">
            <div class="teacher-avatar-admin" style="background: ${t.color || '#6366F1'}">
              ${t.avatar || t.name?.[0] || 'T'}
            </div>
            <div class="teacher-info-admin">
              <h4>${t.name}</h4>
              <p>${t.channel || 'No channel'}</p>
            </div>
            <div class="teacher-actions">
              <button class="btn btn-sm btn-gh" onclick="Admin.deleteItem('teachers', ${idx})">Delete</button>
            </div>
          </div>
        `).join('')}
        ${teachers.length === 0 ? '<div class="empty-state">No teachers added yet.</div>' : ''}
      </div>
      
      <div id="teacherFormArea"></div>
    `;
  },

  showAddTeacherForm() {
    const formArea = document.getElementById('teacherFormArea');
    formArea.innerHTML = `
      <div class="form-card" style="margin-top: 24px;">
        <h3>👨‍🏫 Add New Teacher</h3>
        <div class="form-grid">
          <div class="form-group">
            <label>Name *</label>
            <input type="text" class="fc" id="teacherName" placeholder="e.g., R.K. Sharma">
          </div>
          <div class="form-group">
            <label>Channel</label>
            <input type="text" class="fc" id="teacherChannel" placeholder="e.g., Physics Wallah">
          </div>
          <div class="form-group">
            <label>Avatar (initials)</label>
            <input type="text" class="fc" id="teacherAvatar" placeholder="e.g., RS" maxlength="2">
          </div>
          <div class="form-group">
            <label>Color</label>
            <input type="color" class="fc" id="teacherColor" value="#6366F1">
          </div>
        </div>
        <div class="form-actions">
          <button class="btn btn-primary" onclick="Admin.saveTeacher()">💾 Save Teacher</button>
          <button class="btn btn-gh" onclick="document.getElementById('teacherFormArea').innerHTML=''">Cancel</button>
        </div>
      </div>
    `;
  },

  saveTeacher() {
    const teacher = {
      name: document.getElementById('teacherName').value,
      channel: document.getElementById('teacherChannel').value,
      avatar: document.getElementById('teacherAvatar').value,
      color: document.getElementById('teacherColor').value
    };
    
    if (!teacher.name) { alert('Teacher name is required!'); return; }
    
    if (!this.data.teachers) this.data.teachers = [];
    this.data.teachers.push(teacher);
    this.saveData();
    alert('✅ Teacher added!');
    this.switchSection('teachers');
  },

  clearAllData() {
    if (confirm('⚠️ WARNING: This will delete ALL admin data! Are you sure?')) {
      localStorage.removeItem('vm_admin_data');
      this.data = {};
      alert('All data cleared. Page will refresh.');
      location.reload();
    }
  },

  // Helpers
  getSubjectName(id) {
    const subj = this.subjects.find(s => s.id === id);
    return subj ? subj.name : id;
  },

  getChapterName(id) {
    const ch = this.chapters.find(c => c.id === id);
    return ch ? ch.title : id || '-';
  },

  // Mobile Navigation
  toggleMobileNav() {
    const nav = document.getElementById('adminNav');
    const backdrop = document.getElementById('adminNavBackdrop');
    
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      if (backdrop) backdrop.remove();
      document.body.style.overflow = '';
    } else {
      nav.classList.add('open');
      // Create backdrop
      if (!backdrop) {
        const bd = document.createElement('div');
        bd.id = 'adminNavBackdrop';
        bd.className = 'backdrop on';
        bd.style.zIndex = '899';
        bd.onclick = () => this.toggleMobileNav();
        document.body.appendChild(bd);
      }
      document.body.style.overflow = 'hidden';
    }
  },

  // Close mobile navigation
  closeMobileNav() {
    const nav = document.getElementById('adminNav');
    const backdrop = document.getElementById('adminNavBackdrop');
    nav.classList.remove('open');
    if (backdrop) backdrop.remove();
    document.body.style.overflow = '';
  },

  formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  },

  deleteItem(key, idx) {
    if (confirm('Are you sure you want to delete this item?')) {
      if (this.data[key]) {
        this.data[key].splice(idx, 1);
        this.saveData();
        // Refresh current section
        const sectionMap = {
          'videos': 'links', 'pdfs': 'pdfs', 'quiz': 'quiz',
          'pyqs': 'pyqs', 'papers': 'papers', 'notes': 'notes', 'teachers': 'teachers'
        };
        this.switchSection(sectionMap[key] || 'dashboard');
      }
    }
  },

  checkLogin() {
    const key = localStorage.getItem('vm_admin_key');
    if (key === '6610') {
      document.getElementById('loginWall').style.display = 'none';
      document.getElementById('adminBody').style.display = 'block';
      return true;
    }
    return false;
  },
};