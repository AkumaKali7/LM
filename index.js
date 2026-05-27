// Data for generating personalized content based on user choices
const industryData = {
  technology: {
    name: "Technology",
    trends: ["AI & Machine Learning", "Cloud Computing", "Cybersecurity", "IoT Solutions"],
    challenges: ["Talent acquisition", "Rapid technological changes", "Data privacy concerns"],
    opportunities: ["Digital transformation", "Remote work solutions", "Automation"]
  },
  healthcare: {
    name: "Healthcare",
    trends: ["Telemedicine", "Health Analytics", "Personalized Medicine", "Wearable Tech"],
    challenges: ["Regulatory compliance", "Data security", "Patient engagement"],
    opportunities: ["Preventive care", "Remote monitoring", "AI diagnostics"]
  },
  finance: {
    name: "Finance",
    trends: ["Fintech Innovation", "Blockchain", "Digital Payments", "Robo-advisors"],
    challenges: ["Regulatory changes", "Cybersecurity threats", "Customer trust"],
    opportunities: ["Open banking", "Cryptocurrency", "Automated investing"]
  },
  education: {
    name: "Education",
    trends: ["E-learning Platforms", "Gamification", "VR/AR Learning", "Personalized Education"],
    challenges: ["Student engagement", "Technology adoption", "Accessibility"],
    opportunities: ["Lifelong learning", "Corporate training", "Global reach"]
  }
};

const sizeData = {
  startup: {
    name: "Startup (1-10 employees)",
    focus: ["Agility", "Innovation", "Market validation"],
    recommendations: ["Focus on MVP development", "Build strong company culture", "Leverage automation tools"]
  },
  small: {
    name: "Small Business (11-50)",
    focus: ["Growth", "Process optimization", "Customer retention"],
    recommendations: ["Implement scalable systems", "Invest in employee training", "Develop marketing strategy"]
  },
  medium: {
    name: "Medium (51-500)",
    focus: ["Expansion", "Department specialization", "Brand building"],
    recommendations: ["Establish clear hierarchies", "Invest in infrastructure", "Focus on customer experience"]
  },
  enterprise: {
    name: "Enterprise (500+)",
    focus: ["Market leadership", "Innovation at scale", "Global presence"],
    recommendations: ["Drive digital transformation", "Foster innovation labs", "Optimize supply chain"]
  }
};

const goalData = {
  growth: {
    name: "Business Growth",
    strategies: ["Market expansion", "Product diversification", "Strategic partnerships"],
    metrics: ["Revenue growth rate", "Market share", "Customer acquisition cost"]
  },
  efficiency: {
    name: "Improve Efficiency",
    strategies: ["Process automation", "Lean methodologies", "Resource optimization"],
    metrics: ["Operational costs", "Productivity rates", "Time to market"]
  },
  innovation: {
    name: "Drive Innovation",
    strategies: ["R&D investment", "Design thinking", "Cross-functional teams"],
    metrics: ["New product launches", "Patent filings", "Innovation ROI"]
  },
  compliance: {
    name: "Ensure Compliance",
    strategies: ["Risk assessment", "Policy development", "Regular audits"],
    metrics: ["Compliance score", "Incident reports", "Audit results"]
  }
};

const budgetData = {
  low: {
    name: "$1,000 - $5,000",
    suggestions: ["Focus on high-ROI activities", "Use open-source tools", "Prioritize essential features"]
  },
  medium: {
    name: "$5,000 - $25,000",
    suggestions: ["Invest in quality tools", "Hire specialized consultants", "Build MVP with room to scale"]
  },
  high: {
    name: "$25,000 - $100,000",
    suggestions: ["Comprehensive solution deployment", "Dedicated team", "Full-scale implementation"]
  },
  unlimited: {
    name: "$100,000+",
    suggestions: ["Enterprise-grade solutions", "Custom development", "Long-term strategic partnership"]
  }
};

// Generate PDF using jsPDF
async function generatePDF(answers) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  const industry = industryData[answers.industry];
  const size = sizeData[answers.size];
  const goal = goalData[answers.goal];
  const budget = budgetData[answers.budget];
  
  // Colors
  const primaryColor = [102, 126, 234];
  const secondaryColor = [118, 75, 162];
  
  let yPos = 20;
  
  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Your Personalized Report', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 30, { align: 'center' });
  
  yPos = 55;
  
  // User Choices Section
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Your Choices', 20, yPos);
  yPos += 10;
  
  doc.setDrawColor(...primaryColor);
  doc.line(20, yPos, 190, yPos);
  yPos += 15;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  const choices = [
    `Industry: ${industry.name}`,
    `Company Size: ${size.name}`,
    `Main Goal: ${goal.name}`,
    `Budget Range: ${budget.name}`
  ];
  
  choices.forEach(choice => {
    doc.text(`• ${choice}`, 25, yPos);
    yPos += 8;
  });
  
  yPos += 10;
  
  // Industry Insights
  if (yPos > 200) {
    doc.addPage();
    yPos = 20;
  }
  
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Industry Insights', 20, yPos);
  yPos += 10;
  
  doc.setDrawColor(...primaryColor);
  doc.line(20, yPos, 190, yPos);
  yPos += 15;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...secondaryColor);
  doc.text('Current Trends:', 20, yPos);
  yPos += 8;
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  industry.trends.forEach(trend => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.text(`  • ${trend}`, 25, yPos);
    yPos += 7;
  });
  
  yPos += 5;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...secondaryColor);
  doc.text('Key Challenges:', 20, yPos);
  yPos += 8;
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  industry.challenges.forEach(challenge => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.text(`  • ${challenge}`, 25, yPos);
    yPos += 7;
  });
  
  yPos += 5;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...secondaryColor);
  doc.text('Opportunities:', 20, yPos);
  yPos += 8;
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  industry.opportunities.forEach(opp => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.text(`  • ${opp}`, 25, yPos);
    yPos += 7;
  });
  
  yPos += 10;
  
  // Company Size Recommendations
  if (yPos > 200) {
    doc.addPage();
    yPos = 20;
  }
  
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Company Size Recommendations', 20, yPos);
  yPos += 10;
  
  doc.setDrawColor(...primaryColor);
  doc.line(20, yPos, 190, yPos);
  yPos += 15;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...secondaryColor);
  doc.text('Focus Areas:', 20, yPos);
  yPos += 8;
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  size.focus.forEach(f => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.text(`  • ${f}`, 25, yPos);
    yPos += 7;
  });
  
  yPos += 5;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...secondaryColor);
  doc.text('Recommendations:', 20, yPos);
  yPos += 8;
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  size.recommendations.forEach(rec => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.text(`  • ${rec}`, 25, yPos);
    yPos += 7;
  });
  
  yPos += 10;
  
  // Goal Strategies
  if (yPos > 200) {
    doc.addPage();
    yPos = 20;
  }
  
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Goal Strategy', 20, yPos);
  yPos += 10;
  
  doc.setDrawColor(...primaryColor);
  doc.line(20, yPos, 190, yPos);
  yPos += 15;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...secondaryColor);
  doc.text('Recommended Strategies:', 20, yPos);
  yPos += 8;
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  goal.strategies.forEach(strat => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.text(`  • ${strat}`, 25, yPos);
    yPos += 7;
  });
  
  yPos += 5;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...secondaryColor);
  doc.text('Success Metrics:', 20, yPos);
  yPos += 8;
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  goal.metrics.forEach(metric => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.text(`  • ${metric}`, 25, yPos);
    yPos += 7;
  });
  
  yPos += 10;
  
  // Budget Suggestions
  if (yPos > 200) {
    doc.addPage();
    yPos = 20;
  }
  
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Budget Optimization', 20, yPos);
  yPos += 10;
  
  doc.setDrawColor(...primaryColor);
  doc.line(20, yPos, 190, yPos);
  yPos += 15;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  budget.suggestions.forEach(sug => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.text(`• ${sug}`, 25, yPos);
    yPos += 8;
  });
  
  yPos += 15;
  
  // Footer on each page
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
  }
  
  // Save the PDF
  doc.save('your-personalized-report.pdf');
}

// Form submission handler
document.getElementById('quizForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const answers = {
    industry: formData.get('industry'),
    size: formData.get('size'),
    goal: formData.get('goal'),
    budget: formData.get('budget')
  };
  
  // Show loading
  document.getElementById('loading').classList.remove('hidden');
  this.style.display = 'none';
  
  // Small delay to show loading animation
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    await generatePDF(answers);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('There was an error generating your PDF. Please try again.');
  } finally {
    // Reset form visibility
    document.getElementById('loading').classList.add('hidden');
    this.style.display = 'block';
  }
});
