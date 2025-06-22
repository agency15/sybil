const extractFromDocuments = (clientDocuments, searchTerms) => {
  let relevantInfo = [];
  
  clientDocuments.forEach(doc => {
    const contentLower = doc.content.toLowerCase();
    const summaryLower = doc.summary?.toLowerCase() || '';
    
    const hasRelevantContent = searchTerms.some(term => 
      contentLower.includes(term) || 
      summaryLower.includes(term) ||
      doc.keywords?.some(keyword => keyword.toLowerCase().includes(term))
    );
    
    if (hasRelevantContent) {
      relevantInfo.push({
        docName: doc.name,
        docType: doc.type,
        content: doc.content,
        summary: doc.summary,
        keywords: doc.keywords
      });
    }
  });
  
  return relevantInfo;
};

const extractSpecificInfo = (content, sectionMarkers) => {
  let extracted = [];
  const lines = content.split('\n');
  
  lines.forEach(line => {
    const lineUpper = line.toUpperCase();
    const matchingMarker = sectionMarkers.find(marker => 
      lineUpper.includes(marker.toUpperCase())
    );
    
    if (matchingMarker && line.trim().length > 10) {
      extracted.push(line.trim());
    }
  });
  
  return extracted;
};

export const generateAIResponse = (question, clientValue, clients, processedDocuments) => {
  const client = clients.find(c => c.value === clientValue);
  const clientName = client?.name || 'this client';
  
  const clientDocuments = Object.values(processedDocuments);
  const questionLower = question.toLowerCase();
  
  // Target audience and customer questions
  if (questionLower.includes('target audience') || questionLower.includes('customer') || questionLower.includes('demographics')) {
    const relevantDocs = extractFromDocuments(clientDocuments, ['target', 'audience', 'customer', 'demographic', 'persona']);
    
    if (relevantDocs.length > 0) {
      let response = `Based on ${clientName}'s uploaded documents, here's what I found about their target audience:\n\n`;
      
      relevantDocs.forEach(doc => {
        if (doc.summary) {
          response += `**${doc.docName}:** ${doc.summary}\n\n`;
        }
      });
      
      return response;
    }
  }
  
  // Brand guidelines questions
  if (questionLower.includes('brand') && (questionLower.includes('guideline') || questionLower.includes('identity'))) {
    const relevantDocs = extractFromDocuments(clientDocuments, ['brand', 'identity', 'guideline', 'logo', 'color']);
    
    if (relevantDocs.length > 0) {
      let response = `Here's what I found from ${clientName}'s brand documentation:\n\n`;
      
      relevantDocs.forEach(doc => {
        const brandInfo = extractSpecificInfo(doc.content, ['brand', 'color', 'logo', 'tagline']);
        if (brandInfo.length > 0) {
          response += `**${doc.docName}:**\n`;
          brandInfo.slice(0, 5).forEach(info => response += `• ${info}\n`);
          response += '\n';
        }
      });
      
      return response;
    }
  }
  
  // Meeting summary questions
  if (questionLower.includes('meeting') || questionLower.includes('summary') || questionLower.includes('transcript')) {
    const meetingDocs = extractFromDocuments(clientDocuments, ['meeting', 'transcript', 'discussion']);
    
    if (meetingDocs.length > 0) {
      let response = `Here's a summary from ${clientName}'s meeting documentation:\n\n`;
      
      meetingDocs.forEach(doc => {
        if (doc.summary) {
          response += `**${doc.docName}:** ${doc.summary}\n\n`;
        }
        
        const keyPoints = extractSpecificInfo(doc.content, ['key discussion', 'challenges', 'integration']);
        if (keyPoints.length > 0) {
          response += `**Key Points:**\n`;
          keyPoints.slice(0, 4).forEach(point => response += `• ${point}\n`);
          response += '\n';
        }
      });
      
      return response;
    }
  }
  
  // ICP generation
  if (questionLower.includes('icp') || questionLower.includes('ideal customer') || questionLower.includes('persona')) {
    const relevantDocs = extractFromDocuments(clientDocuments, ['customer', 'audience', 'target', 'demographic']);
    
    if (relevantDocs.length > 0) {
      let response = `Based on ${clientName}'s documentation, here's their Ideal Customer Profile:\n\n`;
      
      relevantDocs.forEach(doc => {
        if (doc.content.includes('family') || doc.content.includes('premium')) {
          response += `**Target Market:** Premium quality seekers who value traditional craftsmanship\n`;
          response += `**Demographics:** Families and individuals who appreciate artisanal products\n`;
          response += `**Values:** Quality, heritage, and authentic experiences\n\n`;
        }
      });
      
      return response;
    }
  }
  
  // General search
  const generalTerms = questionLower.split(' ').filter(word => 
    word.length > 3 && !['what', 'how', 'when', 'where', 'why', 'their', 'about'].includes(word)
  );
  
  if (generalTerms.length > 0) {
    const relevantDocs = extractFromDocuments(clientDocuments, generalTerms);
    
    if (relevantDocs.length > 0) {
      let response = `I found relevant information in ${clientName}'s documents:\n\n`;
      
      relevantDocs.forEach(doc => {
        if (doc.summary) {
          response += `**${doc.docName}:** ${doc.summary}\n\n`;
        }
      });
      
      return response;
    }
  }
  
  // Fallback responses
  const genericResponses = [
    `I don't have specific information about that in ${clientName}'s uploaded documents yet. Try uploading their brand guidelines, meeting transcripts, or other relevant materials so I can provide more detailed insights.`,
    `I need more context from ${clientName}'s documents to answer that question accurately. Please upload relevant files like brand guides or meeting notes.`,
    `That's a great question about ${clientName}! I'll be able to provide much better insights once you upload their brand materials or documentation.`
  ];
  
  return genericResponses[Math.floor(Math.random() * genericResponses.length)];
};
