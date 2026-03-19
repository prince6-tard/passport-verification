import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplication } from '../context/ApplicationContext';
import { UploadCloud, File, CheckCircle2, ChevronRight, X, AlertCircle } from 'lucide-react';

const REQUIRED_DOCS = [
  { id: 'address', title: 'Proof of Address', desc: 'Aadhaar Card, Utility Bill, or Bank Statement' },
  { id: 'dob', title: 'Proof of Date of Birth', desc: 'Birth Certificate, PAN Card, or 10th Marksheet' },
  { id: 'ecr', title: 'Non-ECR Proof', desc: '10th Marksheet or Higher Education Degree' }
];

const DocumentUpload = () => {
  const navigate = useNavigate();
  const { submitApplication, application } = useApplication();
  const [uploads, setUploads] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFileChange = (docId, file) => {
    if (file) {
      // Simulate file upload delay
      setUploads(prev => ({ ...prev, [docId]: { status: 'uploading', file } }));
      setTimeout(() => {
        setUploads(prev => ({ ...prev, [docId]: { status: 'success', file } }));
      }, 1500);
    }
  };

  const removeFile = (docId) => {
    setUploads(prev => {
      const newUploads = { ...prev };
      delete newUploads[docId];
      return newUploads;
    });
  };

  const isAllUploaded = REQUIRED_DOCS.every(doc => uploads[doc.id]?.status === 'success');

  const handleNext = () => {
    navigate('/apply/appointment');
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Upload Documents</h1>
        <p className="text-lg text-slate-600">Please provide clear, readable copies of your documents.</p>
      </div>

      <div className="space-y-6">
        {REQUIRED_DOCS.map((doc) => (
          <div key={doc.id} className="bg-white border text-left border-slate-200 rounded-2xl p-6 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center">
                  {doc.title}
                  {uploads[doc.id]?.status === 'success' && <span className="ml-3 inline-flex bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider items-center"><CheckCircle2 className="w-3 h-3 mr-1"/> Uploaded</span>}
                </h3>
                <p className="text-slate-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1 text-amber-500" />
                  Accepts: {doc.desc}
                </p>
              </div>

              <div className="shrink-0 flex items-center">
                {uploads[doc.id]?.status === 'uploading' ? (
                  <div className="flex items-center text-blue-600 font-medium px-4 py-2 bg-blue-50 rounded-lg">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    Uploading...
                  </div>
                ) : uploads[doc.id]?.status === 'success' ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg">
                      <File className="w-4 h-4 text-slate-500 mr-2" />
                      <span className="text-sm font-medium text-slate-700 truncate max-w-[120px]">
                        {uploads[doc.id].file.name}
                      </span>
                    </div>
                    <button 
                      onClick={() => removeFile(doc.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer bg-white border border-slate-300 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-semibold py-2 px-6 rounded-xl transition-all flex items-center">
                    <UploadCloud className="w-5 h-5 mr-2" />
                    Browse Files
                    <input 
                      type="file" 
                      className="hidden" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(doc.id, e.target.files[0])}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => navigate('/apply/form')}
          className="px-6 py-4 flex items-center text-slate-600 font-semibold hover:bg-slate-100 rounded-xl transition-colors"
        >
          Back to Form
        </button>

        <button
          onClick={handleNext}
          disabled={!isAllUploaded || loading}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Book Appointment
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default DocumentUpload;
