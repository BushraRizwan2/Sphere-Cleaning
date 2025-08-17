

import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { GoogleGenAI } from '@google/genai';
import { Section, SectionType, GlobalStyles, HeroContent, AppointmentContent, SiteConfig, NavLink } from '../types';
import { AVAILABLE_FONTS, SECTION_TEMPLATES, ICONS, AVAILABLE_ANIMATIONS, blogAuthor } from '../constants';
import MediaDisplay from './MediaDisplay';
import ImageUploader from './ImageUploader';
import { stripHtml } from '../utils';

interface SiteEditorProps {
    sections: Section<any>[];
    setSections: React.Dispatch<React.SetStateAction<Section<any>[]>>;
    globalStyles: GlobalStyles;
    setGlobalStyles: React.Dispatch<React.SetStateAction<GlobalStyles>>;
    siteConfig: SiteConfig;
    setSiteConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
    selectedSectionId: string | null;
    setSelectedSectionId: (id: string | null) => void;
    onClose: () => void;
    isOpen: boolean;
}

interface AIGenerationContext {
    label?: string;
    wrapper?: string;
}

type Tab = 'site_theme' | 'layout' | 'edit';

interface FieldDetailProps {
    label: string;
    value: any;
    type?: string;
    font?: string;
    color?: string;
    alignment?: string;
    onGenerate?: () => void;
    generating: boolean;
}

const FieldDetail: React.FC<FieldDetailProps> = ({ label, value, type, font, color, alignment, onGenerate, generating }) => {
    const plainText = stripHtml(value);
    return (
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
            <div className="flex justify-between items-center">
                <p className="text-sm font-bold text-gray-700">{label}</p>
                {onGenerate && (
                    <button
                        onClick={onGenerate}
                        disabled={generating}
                        className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold py-1 px-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-wait"
                    >
                        {generating ? 'Generating...' : '✨ AI'}
                    </button>
                )}
            </div>
            <p className="text-xs text-gray-800 bg-white p-2 rounded border truncate" title={plainText}>{plainText || '(empty)'}</p>
            {(font || color || alignment || type) && (
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500">
                    {type && <div><strong>Type:</strong> {type}</div>}
                    {font && <div><strong>Font:</strong> {font}</div>}
                    {color && <div className="flex items-center"><strong>Color:</strong> <span className="w-3 h-3 rounded-full ml-2 border border-gray-300" style={{ backgroundColor: color }}></span></div>}
                    {alignment && <div><strong>Align:</strong> {alignment}</div>}
                </div>
            )}
        </div>
    );
};

const SiteEditor: React.FC<SiteEditorProps> = ({ sections, setSections, globalStyles, setGlobalStyles, siteConfig, setSiteConfig, selectedSectionId, setSelectedSectionId, onClose, isOpen }) => {
    const [activeTab, setActiveTab] = useState<Tab>('site_theme');
    const [isCollapsed, setCollapsed] = useState(false);
    const nodeRef = useRef(null);

    const selectedSection = sections.find(s => s.id === selectedSectionId);

    useEffect(() => {
        if(selectedSectionId && activeTab !== 'edit') {
            setActiveTab('edit');
        }
    }, [selectedSectionId]);

    const handleGlobalStyleChange = (type: 'colors' | 'fonts', key: string, value: string) => {
        setGlobalStyles(prev => ({ ...prev, [type]: { ...prev[type], [key]: value } }));
    };

    const handleSectionStyleChange = (property: 'backgroundColor' | 'textColor' | 'animation', value: string) => {
        if (!selectedSection) return;
        const newSection = { ...selectedSection, styles: { ...selectedSection.styles, [property]: value } };
        setSections(prev => prev.map(s => s.id === selectedSectionId ? newSection : s));
    };
    
    const handleSectionContentChange = (content: any) => {
        if (!selectedSection) return;
        const newSection = { ...selectedSection, content };
        setSections(prev => prev.map(s => s.id === selectedSectionId ? newSection : s));
    };

    const addSection = (type: SectionType) => {
        const newSection = SECTION_TEMPLATES[type]();
        const currentIndex = sections.findIndex(s => s.id === selectedSectionId);
        const newSections = [...sections];
        newSections.splice(currentIndex >= 0 ? currentIndex + 1 : sections.length, 0, newSection);
        setSections(newSections);
        setSelectedSectionId(newSection.id);
    };
    
    const removeSection = (id: string) => {
        setSections(prev => prev.filter(s => s.id !== id));
        if (selectedSectionId === id) {
            setSelectedSectionId(null);
        }
    };
    
    const moveSection = (index: number, direction: 'up' | 'down') => {
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === sections.length - 1)) return;
        const newSections = [...sections];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
        setSections(newSections);
    };

    if (!isOpen) return null;

    return (
        <Draggable nodeRef={nodeRef} handle=".cursor-move">
            <div
                ref={nodeRef}
                className={`fixed top-4 right-4 left-4 sm:left-auto sm:w-[480px] md:w-[560px] lg:w-[640px] z-[70] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col transition-all duration-300 ${isCollapsed ? 'h-12 overflow-hidden' : 'h-[95vh] max-h-[800px]'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-2 bg-gray-50 border-b border-gray-200 cursor-move">
                    <h2 className="font-bold text-gray-700">Site Editor</h2>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => setCollapsed(!isCollapsed)} className="p-1 text-gray-500 hover:text-gray-800">
                            {isCollapsed ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4h4m12 4V4h-4M4 16v4h4m12-4v4h-4" /></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        </button>
                        <button onClick={onClose} className="p-1 text-gray-500 hover:text-red-600">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                </div>

                {!isCollapsed && (
                    <>
                        {/* Tabs */}
                        <div className="flex border-b border-gray-200">
                            <TabButton name="Site & Theme" icon="🌐" tab="site_theme" activeTab={activeTab} setActiveTab={setActiveTab} />
                            <TabButton name="Layout" icon="📑" tab="layout" activeTab={activeTab} setActiveTab={setActiveTab} />
                            <TabButton name="Edit" icon="✏️" tab="edit" activeTab={activeTab} setActiveTab={setActiveTab} disabled={!selectedSection} />
                        </div>
                        {/* Content */}
                        <div className="flex-grow p-4 overflow-y-auto">
                            {activeTab === 'site_theme' && <SiteThemeEditor siteConfig={siteConfig} setSiteConfig={setSiteConfig} globalStyles={globalStyles} onGlobalStyleChange={handleGlobalStyleChange} />}
                            {activeTab === 'layout' && <LayoutEditor sections={sections} addSection={addSection} removeSection={removeSection} moveSection={moveSection} selectedSectionId={selectedSectionId} selectSection={setSelectedSectionId} />}
                            {activeTab === 'edit' && <SectionEditor section={selectedSection} onStyleChange={handleSectionStyleChange} onContentChange={handleSectionContentChange} globalStyles={globalStyles} />}
                        </div>
                    </>
                )}
            </div>
        </Draggable>
    );
};

const TabButton = ({ name, icon, tab, activeTab, setActiveTab, disabled=false }) => (
    <button onClick={() => !disabled && setActiveTab(tab)} disabled={disabled} className={`flex-1 flex items-center justify-center p-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:bg-gray-100'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <span className="mr-2">{icon}</span> {name}
    </button>
);

const SiteThemeEditor = ({ siteConfig, setSiteConfig, globalStyles, onGlobalStyleChange }) => (
    <div className="space-y-6">
        <SiteSettingsEditor siteConfig={siteConfig} setSiteConfig={setSiteConfig} />
        <div className="border-t pt-6">
            <HeaderFooterStyleEditor siteConfig={siteConfig} setSiteConfig={setSiteConfig} />
        </div>
        <div className="border-t pt-6">
            <ThemeEditor styles={globalStyles} onChange={onGlobalStyleChange} />
        </div>
    </div>
);

const SiteSettingsEditor = ({ siteConfig, setSiteConfig }) => {

    const handleConfigChange = (field, value) => {
        setSiteConfig(prev => ({...prev, [field]: value}));
    };
    
    const handleListChange = (listKey, index, field, value) => {
        const newList = [...siteConfig[listKey]];
        newList[index] = {...newList[index], [field]: value};
        handleConfigChange(listKey, newList);
    };

    const handleAddItem = (listKey, newItem) => {
        const newList = [...siteConfig[listKey], {...newItem, id: crypto.randomUUID()}];
        handleConfigChange(listKey, newList);
    };
    
    const handleRemoveItem = (listKey, id) => {
        const newList = siteConfig[listKey].filter(item => item.id !== id);
        handleConfigChange(listKey, newList);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Site Settings</h3>
            
            {/* Contact Info */}
            <div className="space-y-2">
                 <h4 className="font-semibold text-sm text-gray-600">Contact Information</h4>
                 <TextInput label="Phone Number" value={siteConfig.phoneNumber} onChange={v => handleConfigChange('phoneNumber', v)} />
                 <TextInput label="Email Address" value={siteConfig.emailAddress} onChange={v => handleConfigChange('emailAddress', v)} />
                 <TextInput label="Physical Address" value={siteConfig.physicalAddress} onChange={v => handleConfigChange('physicalAddress', v)} />
            </div>

            {/* Navigation Links */}
            <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-600">Navigation Links</h4>
                {siteConfig.navLinks.map((link, index) => (
                    <div key={link.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <input type="text" placeholder="Name" value={link.name} onChange={e => handleListChange('navLinks', index, 'name', e.target.value)} className="w-full p-1 border rounded text-sm"/>
                        <input type="text" placeholder="Href" value={link.href} onChange={e => handleListChange('navLinks', index, 'href', e.target.value)} className="w-full p-1 border rounded text-sm"/>
                        <button onClick={() => handleRemoveItem('navLinks', link.id)} className="p-1 text-red-500 hover:text-red-700 flex-shrink-0"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg></button>
                    </div>
                ))}
                 <button onClick={() => handleAddItem('navLinks', {name: 'New Link', href: '#'})} className="w-full mt-1 bg-blue-100 text-blue-700 font-semibold py-1 px-2 rounded-md hover:bg-blue-200 transition-all text-xs">
                    + Add Nav Link
                </button>
            </div>

            {/* Social Links */}
             <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-600">Social Media Links</h4>
                {siteConfig.socialLinks.map((link, index) => (
                    <div key={link.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <select value={link.name} onChange={e => handleListChange('socialLinks', index, 'name', e.target.value)} className="p-1 border rounded text-sm">
                            <option>Facebook</option>
                            <option>Twitter</option>
                            <option>LinkedIn</option>
                            <option>Instagram</option>
                            <option>WhatsApp</option>
                        </select>
                        <input type="text" placeholder="URL" value={link.url} onChange={e => handleListChange('socialLinks', index, 'url', e.target.value)} className="w-full p-1 border rounded text-sm"/>
                        <button onClick={() => handleRemoveItem('socialLinks', link.id)} className="p-1 text-red-500 hover:text-red-700 flex-shrink-0"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg></button>
                    </div>
                ))}
                 <button onClick={() => handleAddItem('socialLinks', {name: 'Facebook', url: '#'})} className="w-full mt-1 bg-blue-100 text-blue-700 font-semibold py-1 px-2 rounded-md hover:bg-blue-200 transition-all text-xs">
                    + Add Social Link
                </button>
            </div>
        </div>
    );
};

const HeaderFooterStyleEditor = ({ siteConfig, setSiteConfig }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Header & Footer Styles</h3>
            <div className="space-y-2">
                <ColorInput label="Header Background" value={siteConfig.headerBackgroundColor} onChange={v => setSiteConfig(p => ({...p, headerBackgroundColor: v}))} />
                <ColorInput label="Footer Background" value={siteConfig.footerBackgroundColor} onChange={v => setSiteConfig(p => ({...p, footerBackgroundColor: v}))} />
            </div>
        </div>
    );
};

const TextInput = ({ label, value, onChange }) => (
    <div>
        <label className="text-xs text-gray-500">{label}</label>
        <input type="text" value={value} onChange={e => onChange(e.target.value)} className="w-full p-1 border rounded mt-0.5 text-sm"/>
    </div>
);


const ThemeEditor = ({ styles, onChange }) => (
    <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Global Theme</h3>
        <div>
            <h4 className="font-semibold mb-2">Colors</h4>
            <div className="space-y-2">
                <ColorInput label="Primary" value={styles.colors.primary} onChange={v => onChange('colors', 'primary', v)} />
                <ColorInput label="Secondary" value={styles.colors.secondary} onChange={v => onChange('colors', 'secondary', v)} />
                <ColorInput label="Text" value={styles.colors.text} onChange={v => onChange('colors', 'text', v)} />
                <ColorInput label="Background" value={styles.colors.background} onChange={v => onChange('colors', 'background', v)} />
            </div>
        </div>
        <div>
            <h4 className="font-semibold mb-2">Fonts</h4>
            <div className="space-y-2">
                <FontInput label="Heading Font" value={styles.fonts.heading} onChange={v => onChange('fonts', 'heading', v)} />
                <FontInput label="Body Font" value={styles.fonts.body} onChange={v => onChange('fonts', 'body', v)} />
            </div>
        </div>
    </div>
);

const ColorInput = ({ label, value, onChange }) => (
    <div className="flex items-center justify-between">
        <label className="text-sm text-gray-600">{label}</label>
        <input type="color" value={value} onChange={e => onChange(e.target.value)} className="w-8 h-8 p-0 border-none rounded cursor-pointer"/>
    </div>
);

const FontInput = ({ label, value, onChange }) => (
    <div className="flex items-center justify-between">
        <label className="text-sm text-gray-600">{label}</label>
        <select value={value} onChange={e => onChange(e.target.value)} className="p-1 border rounded text-sm">
            {AVAILABLE_FONTS.map(font => <option key={font.name} value={font.name}>{font.name}</option>)}
        </select>
    </div>
);

const LayoutEditor = ({ sections, addSection, removeSection, moveSection, selectedSectionId, selectSection }) => {
    const [showAdd, setShowAdd] = useState(false);
    return (
    <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Page Layout</h3>
        <p className="text-sm text-gray-500">Click to select a section to edit its content.</p>
        <ul className="space-y-2">
            {sections.map((s, i) => (
                <li key={s.id} onClick={() => selectSection(s.id)} className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${selectedSectionId === s.id ? 'bg-blue-100 border border-blue-400' : 'bg-gray-100'}`}>
                    <span className="font-medium text-gray-700 capitalize flex-grow">{s.type.replace('-', ' ')}</span>
                    <div className="flex items-center space-x-1">
                        <button onClick={(e) => {e.stopPropagation(); moveSection(i, 'up')}} disabled={i === 0} className="p-1 disabled:opacity-30"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg></button>
                        <button onClick={(e) => {e.stopPropagation(); moveSection(i, 'down')}} disabled={i === sections.length - 1} className="p-1 disabled:opacity-30"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></button>
                        <button onClick={(e) => {e.stopPropagation(); removeSection(s.id)}} className="p-1 text-red-500 hover:text-red-700"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg></button>
                    </div>
                </li>
            ))}
        </ul>
        <div className="relative">
            <button onClick={() => setShowAdd(!showAdd)} className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all">
                + Add Section
            </button>
            {showAdd && (
                <div className="absolute bottom-full mb-2 w-full bg-white border rounded-lg shadow-lg p-2 grid grid-cols-2 gap-2 z-10">
                    {Object.keys(SECTION_TEMPLATES).map(type => (
                        <button key={type} onClick={() => { addSection(type as SectionType); setShowAdd(false); }} className="p-2 border rounded-md text-sm hover:bg-gray-100 capitalize">{type.replace('-', ' ')}</button>
                    ))}
                </div>
            )}
        </div>
    </div>
    );
};

const ImageDetail = ({ label, src, onUpload }) => (
    <div>
        <label className="text-sm font-bold text-gray-700">{label}</label>
        <ImageUploader onUpload={onUpload}>
            <MediaDisplay src={src} alt="preview" className="w-full h-24 object-cover rounded mt-1 border border-gray-200 bg-gray-50 cursor-pointer" />
        </ImageUploader>
    </div>
);

const SectionEditor = ({ section, onStyleChange, onContentChange, globalStyles }) => {
    const [generatingField, setGeneratingField] = useState<string | null>(null);

    if (!section) {
        return <div className="text-center text-gray-500 mt-10">Select a section on the page to edit its content and styles.</div>;
    }

    const handleGenerateContent = async (field: string, currentValue: string, context: AIGenerationContext = {}) => {
        if (generatingField) return;
        if (typeof process === 'undefined' || !process.env || !process.env.API_KEY) {
            alert("AI features are not configured for this environment."); return;
        }
        setGeneratingField(field);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const plainTextValue = stripHtml(currentValue);
            let prompt = `You are a creative copywriter for "CleanSphere", a professional cleaning company. Your tone is friendly, professional, and trustworthy. Generate a new version for the following piece of content for the website's "${section.type.replace('-', ' ')}" section.\n\nContent Type: ${context.label || field}\nCurrent Text: "${plainTextValue}"\n\nPlease provide only the new text, without any extra formatting or quotation marks.`;
            if (context.wrapper) { prompt += ` The final output should be wrapped in a single <${context.wrapper}> tag.` }
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            let newContent = response.text;
            if (context.wrapper && !newContent.startsWith(`<${context.wrapper}>`)) { newContent = `<${context.wrapper}>${newContent}</${context.wrapper}>`; }
            if (field.includes('.')) {
                const [itemsKey, indexStr, itemField] = field.split('.');
                const index = parseInt(indexStr, 10);
                handleItemChange(itemsKey, index, itemField, newContent);
            } else { onContentChange({ ...section.content, [field]: newContent }); }
        } catch (error) {
            console.error("AI Generation Error:", error); alert("Sorry, an error occurred while generating content.");
        } finally { setGeneratingField(null); }
    };

    const handleItemChange = (itemsKey: string, index: number, field: string, value: any) => {
        if (!section?.content) return;
        const newItems = [...(section.content[itemsKey] || [])];
        if (newItems[index]) { newItems[index] = { ...newItems[index], [field]: value }; onContentChange({ ...section.content, [itemsKey]: newItems }); }
    };

    const handleAddItem = (itemsKey: string, template: any) => {
        if (!section?.content) return;
        const newItems = [...(section.content[itemsKey] || []), { ...template, id: crypto.randomUUID() }];
        onContentChange({ ...section.content, [itemsKey]: newItems });
    };
    
    const handleRemoveItem = (itemsKey: string, id: string) => {
        if (!section?.content) return;
        const newItems = (section.content[itemsKey] || []).filter(item => item.id !== id);
        onContentChange({ ...section.content, [itemsKey]: newItems });
    };

    const renderItemEditor = (item, index, itemsKey, fields) => (
        <div key={item.id} className="p-3 bg-gray-100 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
                <p className="font-bold text-sm text-gray-600 truncate flex-1 pr-2">{stripHtml(item[fields.title]) || `Item ${index + 1}`}</p>
                <button onClick={() => handleRemoveItem(itemsKey, item.id)} className="p-1 text-red-500 hover:text-red-700 flex-shrink-0"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg></button>
            </div>
            {fields.image && <ImageDetail label="Image" src={item[fields.image]} onUpload={v => handleItemChange(itemsKey, index, fields.image, v)} />}
            {fields.icon && <div><label className="text-sm font-bold text-gray-700">Icon</label><select value={item[fields.icon]} onChange={e => handleItemChange(itemsKey, index, fields.icon, e.target.value)} className="w-full p-1 border rounded mt-1 text-sm capitalize">{Object.keys(ICONS).map(name => <option key={name} value={name}>{name}</option>)}</select></div>}
            <FieldDetail label="Title" value={item[fields.title]} onGenerate={() => handleGenerateContent(`${itemsKey}.${index}.${fields.title}`, item[fields.title], { wrapper: 'h3' })} generating={generatingField === `${itemsKey}.${index}.${fields.title}`} />
            {fields.desc && <FieldDetail label="Description" value={item[fields.desc]} onGenerate={() => handleGenerateContent(`${itemsKey}.${index}.${fields.desc}`, item[fields.desc], { wrapper: 'p' })} generating={generatingField === `${itemsKey}.${index}.${fields.desc}`} />}
        </div>
    );
    
    const renderListEditor = (title, itemsKey, itemFields, template) => (
        <div className="space-y-3">
            <h4 className="font-semibold text-gray-700 pt-3 border-t">{title}</h4>
            {(section.content[itemsKey] || []).map((item, index) => renderItemEditor(item, index, itemsKey, itemFields))}
            <button onClick={() => handleAddItem(itemsKey, template)} className="w-full mt-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-all text-sm">+ Add {stripHtml(title).slice(0,-1)}</button>
        </div>
    );
    
    const renderContentUI = () => {
        const { type, content } = section;
        if (!content) return <p className="text-sm text-gray-500">This section has no content to edit.</p>;
        
        const mainTitle = <FieldDetail label="Section Title" value={content.title} onGenerate={() => handleGenerateContent('title', content.title, { wrapper: 'h2' })} generating={generatingField === 'title'} />
        const mainSubtitle = <FieldDetail label="Section Subtitle" value={content.subtitle} onGenerate={() => handleGenerateContent('subtitle', content.subtitle, { wrapper: 'p' })} generating={generatingField === 'subtitle'} />

        switch (type) {
            case 'hero': {
                const heroContent = content as HeroContent;
                return (
                    <div className="space-y-4">
                        <FieldDetail label="Headline" value={heroContent.title} type="h1" onGenerate={() => handleGenerateContent('title', heroContent.title, { wrapper: 'h1' })} generating={generatingField === 'title'} />
                        <FieldDetail label="Sub-headline" value={heroContent.subtitle} type="p" onGenerate={() => handleGenerateContent('subtitle', heroContent.subtitle, { wrapper: 'p' })} generating={generatingField === 'subtitle'} />
                        <div>
                            <label className="font-semibold text-gray-700">Layout</label>
                            <div className="flex items-center space-x-4 mt-1">
                                {['split-screen', 'background-image'].map(layout => (
                                    <label key={layout} className="flex items-center cursor-pointer"><input type="radio" name="hero-layout" value={layout} checked={heroContent.layout === layout} onChange={() => onContentChange({...content, layout})} className="form-radio h-4 w-4 text-primary focus:ring-primary"/><span className="ml-2 text-sm capitalize">{layout.replace('-', ' ')}</span></label>
                                ))}
                            </div>
                        </div>
                        {heroContent.layout === 'split-screen' && (
                          <div className="space-y-3">
                              <h4 className="font-semibold text-gray-700 pt-3 border-t">Slider Images</h4>
                              <div className="space-y-2">
                              {(heroContent.sliderImages || []).map((image, index) => (
                                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                      <ImageUploader
                                          onUpload={v => {
                                              const newImages = [...heroContent.sliderImages];
                                              newImages[index] = v;
                                              onContentChange({...content, sliderImages: newImages });
                                          }}
                                      >
                                          <MediaDisplay src={image} alt={`Slide ${index}`} className="w-16 h-12 flex-shrink-0 object-cover rounded cursor-pointer" />
                                      </ImageUploader>
                                      <p className="text-xs text-gray-500 truncate flex-grow">Image {index + 1}</p>
                                      <button
                                          onClick={() => {
                                              const newImages = (heroContent.sliderImages || []).filter((_, i) => i !== index);
                                              onContentChange({ ...content, sliderImages: newImages });
                                          }}
                                          className="p-1 text-red-500 hover:text-red-700 flex-shrink-0"
                                          aria-label={`Remove Image ${index + 1}`}
                                      >
                                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                                      </button>
                                  </div>
                              ))}
                              </div>
                              <button
                                  onClick={() => {
                                      const newImages = [...(heroContent.sliderImages || []), 'https://placehold.co/800x600/cccccc/333333?text=New+Image'];
                                      onContentChange({ ...content, sliderImages: newImages });
                                  }}
                                  className="w-full mt-2 bg-blue-100 text-blue-700 font-semibold py-1 px-2 rounded-md hover:bg-blue-200 transition-all text-sm"
                              >
                                  + Add Slider Image
                              </button>
                          </div>
                        )}
                        {heroContent.layout === 'background-image' && <ImageDetail label="Background Image" src={heroContent.backgroundImage} onUpload={v => onContentChange({...content, backgroundImage: v})} />}
                    </div>
                );
            }
            case 'about': return (
                <div className="space-y-4">
                    {mainTitle} {mainSubtitle}
                    <FieldDetail label="Paragraph" value={content.paragraph} onGenerate={() => handleGenerateContent('paragraph', content.paragraph, { wrapper: 'p' })} generating={generatingField === 'paragraph'} />
                    <ImageDetail label="Image" src={content.image} onUpload={v => onContentChange({...content, image: v})} />
                    {renderListEditor("Stats", "stats", { title: 'label', desc: 'value' }, { value: '100+', label: 'New Stat' })}
                </div>
            );
            case 'appointment': {
                const appointmentContent = content as AppointmentContent;
                return (
                    <div className="space-y-4">
                        {mainTitle} {mainSubtitle}
                        <div>
                            <label className="text-sm font-bold text-gray-700">Image Layout</label>
                            <div className="flex items-center space-x-4 mt-1">{['none', 'left', 'right'].map(layout => (<label key={layout} className="flex items-center cursor-pointer capitalize"><input type="radio" name="appointment-layout" value={layout} checked={appointmentContent.imageLayout === layout} onChange={() => onContentChange({...content, imageLayout: layout})} className="form-radio h-4 w-4 text-primary focus:ring-primary"/><span className="ml-2 text-sm">{layout}</span></label>))}</div>
                        </div>
                        {appointmentContent.imageLayout !== 'none' && <ImageDetail label="Image" src={appointmentContent.imageSrc || ''} onUpload={v => onContentChange({...content, imageSrc: v})} />}
                    </div>
                );
            }
            case 'services': return <div className="space-y-4">{mainTitle} {mainSubtitle} {renderListEditor("Services", "items", { title: 'title', desc: 'description', image: 'image' }, { image: 'https://placehold.co/600x400/FBBF24/1E3A8A?text=New', title: '<h3>New</h3>', description: '<p>Desc</p>', detailedDescription: '<p>Desc</p>', pricing: { type: 'quote'}, faqs:[] })}</div>;
            case 'blog': return <div className="space-y-4">{mainTitle} {mainSubtitle} {renderListEditor("Blog Posts", "posts", { title: 'title', image: 'image' }, { title: '<h3>New Post</h3>', image: 'https://placehold.co/600x400/cccccc/333333?text=New+Post', date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), comments: 0, author: blogAuthor, content: '<p>Content</p>' })}</div>;
            case 'how-it-works': return <div className="space-y-4">{mainTitle} {mainSubtitle} {renderListEditor("Steps", "steps", { title: 'title', desc: 'description', icon: 'icon' }, { icon: 'book', title: '<h3>New</h3>', description: '<p>Desc</p>' })}</div>;
            case 'why-us': return <div className="space-y-4">{mainTitle} {mainSubtitle} <ImageDetail label="Image" src={content.image} onUpload={v => onContentChange({...content, image: v})} /> {renderListEditor("Benefits", "items", { title: 'title', desc: 'description', icon: 'icon' }, { icon: 'quality', title: '<h3>New</h3>', description: '<p>Desc</p>' })}</div>;
            case 'pricing': return <div className="space-y-4">{mainTitle} {mainSubtitle} {renderListEditor("Plans", "items", { title: 'name' }, { name: '<h3>New Plan</h3>', price: '0', frequency: '/mo', features: [], isPopular: false })}</div>;
            case 'team': return <div className="space-y-4">{mainTitle} {mainSubtitle} {renderListEditor("Members", "members", { title: 'name', desc: 'role', image: 'avatar' }, { name: '<h3>New</h3>', role: '<p>Role</p>', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&auto=format&fit=crop' })}</div>;
            case 'testimonials': return <div className="space-y-4">{mainTitle} {mainSubtitle} {renderListEditor("Testimonials", "items", { title: 'name', desc: 'quote', image: 'avatar' }, { quote: '<p>Quote</p>', name: '<h3>Name</h3>', company: '<p>Company</p>', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&auto=format&fit=crop' })}</div>;
            default: return <p className="text-sm text-gray-500">This section type has no specific editor.</p>
        }
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 capitalize">{section.type.replace('-', ' ')} Section</h3>
            <div>
                <h4 className="font-semibold mb-2">Styles</h4>
                <div className="space-y-2">
                    <ColorInput label="Background Color" value={section.styles.backgroundColor} onChange={v => onStyleChange('backgroundColor', v)} />
                    <ColorInput label="Text Color" value={section.styles.textColor} onChange={v => onStyleChange('textColor', v)} />
                    {section.styles.hasOwnProperty('animation') &&
                        <div className="flex items-center justify-between">
                            <label className="text-sm text-gray-600">Card Animation</label>
                            <select value={section.styles.animation} onChange={e => onStyleChange('animation', e.target.value)} className="p-1 border rounded text-sm">
                                {AVAILABLE_ANIMATIONS.map(anim => <option key={anim.value} value={anim.value}>{anim.name}</option>)}
                            </select>
                        </div>
                    }
                </div>
            </div>
            <div>
                 <h4 className="font-semibold mb-2 border-t pt-4 mt-4">Content</h4>
                {renderContentUI()}
            </div>
        </div>
    );
};

export default SiteEditor;