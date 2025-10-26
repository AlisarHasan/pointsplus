import React, { useState, useEffect } from 'react';

import "../../../styles/appearance.css";


const AppearanceSettings = () => {
  const [selectedTheme, setSelectedTheme] = useState('light');

  // تحميل السمة المحفوظة عند بدء التشغيل
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setSelectedTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  // تطبيق السمة على الـ DOM
  const applyTheme = (theme) => {
    const htmlElement = document.documentElement;
    
    if (theme === 'auto') {
      // الكشف عن سمة النظام
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      htmlElement.setAttribute('data-theme', systemTheme);
    } else {
      htmlElement.setAttribute('data-theme', theme);
    }
    
    localStorage.setItem('theme', theme);
  };

  // معالج تغيير السمة
  const handleThemeChange = (event) => {
    const newTheme = event.target.value;
    setSelectedTheme(newTheme);
    applyTheme(newTheme);
  };

  // الاستماع لتغير سمة النظام
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = () => {
      if (selectedTheme === 'auto') {
        applyTheme('auto');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [selectedTheme]);
    return (
        <div class="appearance-container">
        <h2>Appearance & Theme</h2>

        <div className="appearance-section">
        <h3 className='h-section'>Theme :</h3>
        <div className="checkbox-group">
        <div className="checkbox-item">
          <input 
            type="radio" 
            id="light-theme" 
            name="theme" 
            value="light" 
            checked={selectedTheme === 'light'}
            onChange={handleThemeChange}
          />
          <label htmlFor="light-theme">Light</label>
        </div>
        
        <div className="checkbox-item">
          <input 
            type="radio" 
            id="dark-theme" 
            name="theme" 
            value="dark" 
            checked={selectedTheme === 'dark'}
            onChange={handleThemeChange}
          />
          <label htmlFor="dark-theme">Dark</label>
        </div>
        
        <div className="checkbox-item">
          <input 
            type="radio" 
            id="auto-theme" 
            name="theme" 
            value="auto" 
            checked={selectedTheme === 'auto'}
            onChange={handleThemeChange}
          />
          <label htmlFor="auto-theme">Auto</label>
        </div>
      </div>
     </div> 


     <div className="custom-section">
      <div className='custom-info'>
        <h3 className='h-section'>Custom Themes :</h3>
        <p>create a custom theme</p>
      </div>
        <button className='btn-seconary'>create a new theme</button>
     </div>



     <div className="appearance-section">
        <h3 className='h-section'>Font Size :</h3>
        <div class="slider-container">
            <input type="range"  class="font-slider" />
            <div class="slider-labels">
             <span>Small</span>
             <span>Normal</span>
             <span>Big</span>
            </div>
            </div>
     </div>

     <div className="animation-section">
        <h3 className='h-section'>animation Preferences :</h3>
        <div className="toggle-container">
        <span className="toggle-label">off</span>
        <label className="switch">
          <input type="checkbox"/>
          <span className="slider round"></span>
        </label>
        <span className="toggle-label">on</span>
      </div>
     </div>

      <div className="view-section">
      <h3 className="view-selector">View Preferences :</h3>
      <div className="checkbox-group">
        <div className="checkbox-item">
          <input 
            type="radio" 
            id="view-list" 
            name="view" 
            value="list" 
          />
          <label htmlFor="view-list">List</label>
        </div>
        
        <div className="checkbox-item">
          <input 
            type="radio" 
            id="view-cards" 
            name="view" 
            value="cards" 
          />
          <label htmlFor="view-cards">Cards</label>
        </div>
        
        <div className="checkbox-item">
          <input 
            type="radio" 
            id="view-calender" 
            name="view" 
            value="calender" 
          />
          <label htmlFor="view-calender">Calender</label>
        </div>

        <div className="checkbox-item">
          <input 
            type="radio" 
            id="view-network" 
            name="view" 
            value="network" 
          />
          <label htmlFor="view-network">Network</label>
        </div>

      </div>
      </div>

        <div className="order-section">
        <h3 className="order-selector">Sort Order By :</h3>
          <select className='dropdown' >
          <option className="date-desc">Latest</option>
          <option className="date-asc">Oldest</option>
          <option className="priority">Priority</option>
          <option className="alphabetical">Alphabetical</option>
        </select>
        </div>
       



        
        </div>
    );
};
export default AppearanceSettings;