

import React, { useRef, useState, useEffect } from 'react';

interface RichEditableFieldProps {
    isAdmin: boolean;
    value: string;
    onChange: (newValue: string) => void;
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
    className?: string;
    style?: React.CSSProperties;
}

const RichEditableField: React.FC<RichEditableFieldProps> = ({ isAdmin, value, onChange, as = 'div', className, style }) => {
    const fieldRef = useRef<HTMLDivElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const colorInputRef = useRef<HTMLInputElement>(null);
    
    // To prevent re-rendering from cursor position changes
    const lastValue = useRef(value);
    useEffect(() => {
        if (fieldRef.current && (value || '') !== lastValue.current) {
            fieldRef.current.innerHTML = value || '';
            lastValue.current = value;
        }
    }, [value]);
    
    if (!isAdmin) {
        const Tag = as;
        return <Tag className={`${className} rich-text-field`} style={style} dangerouslySetInnerHTML={{ __html: value || '' }} />;
    }

    const handleBlur = () => {
        if (fieldRef.current) {
            const newValue = fieldRef.current.innerHTML;
            if (newValue !== lastValue.current) {
              onChange(newValue);
              lastValue.current = newValue;
            }
        }
        setIsEditing(false);
    };

    const handleFocus = () => {
        setIsEditing(true);
    };

    const handleCommand = (command: string, arg?: string) => {
        document.execCommand(command, false, arg);
        if (fieldRef.current) {
            const newValue = fieldRef.current.innerHTML;
            onChange(newValue);
            lastValue.current = newValue;
            fieldRef.current.focus();
        }
    };
    
    const handleLink = () => {
        const url = prompt('Enter the URL:', 'https://');
        if (url) {
            handleCommand('createLink', url);
        }
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleCommand('foreColor', e.target.value);
    }
    
    const ToolbarButton = ({ children, onClick, title }) => (
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={onClick} title={title} className="p-2 hover:bg-gray-700 rounded-md">
            {children}
        </button>
    );

    const Tag = as;

    return (
        <div className="relative">
            {isEditing && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-20 bg-gray-800 text-white rounded-md shadow-lg flex flex-wrap items-center p-1 space-x-0.5">
                    <ToolbarButton onClick={() => handleCommand('formatBlock', '<h1>')} title="Heading 1">
                        <span className="font-bold text-xs">H1</span>
                    </ToolbarButton>
                    <ToolbarButton onClick={() => handleCommand('formatBlock', '<h2>')} title="Heading 2">
                        <span className="font-bold text-xs">H2</span>
                    </ToolbarButton>
                    <ToolbarButton onClick={() => handleCommand('formatBlock', '<h3>')} title="Heading 3">
                        <span className="font-bold text-xs">H3</span>
                    </ToolbarButton>
                    <ToolbarButton onClick={() => handleCommand('formatBlock', '<h4>')} title="Heading 4">
                        <span className="font-bold text-xs">H4</span>
                    </ToolbarButton>
                     <ToolbarButton onClick={() => handleCommand('formatBlock', '<p>')} title="Paragraph">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H8.25v10a.75.75 0 01-1.5 0V5.5H2.75A.75.75 0 012 4.75z" clipRule="evenodd" /></svg>
                    </ToolbarButton>
                    <div className="w-px h-5 bg-gray-600 mx-1"></div>
                    <ToolbarButton onClick={() => handleCommand('bold')} title="Bold">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4.5a2.5 2.5 0 012.5-2.5h3.75a2.25 2.25 0 012.25 2.25c0 1.07-.67 1.99-1.59 2.28L12 9.5h-1.5l.69 1.48a2.25 2.25 0 01-2.08 3.02H6.25a2.25 2.25 0 01-2.25-2.25V6.5A2.5 2.5 0 015 4.5zM6.5 6.5v3.5h2.25a.75.75 0 00.69-.44l.31-1.12H6.5zm.75-2a.5.5 0 00-.5.5v.5h3a.75.75 0 000-1.5h-2.5a.5.5 0 00-.5.5z" clipRule="evenodd"></path></svg>
                    </ToolbarButton>
                    <ToolbarButton onClick={() => handleCommand('italic')} title="Italic">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M7.75 4a.75.75 0 000 1.5h1.25l-2.5 9H5a.75.75 0 000 1.5h5a.75.75 0 000-1.5H8.75l2.5-9H13a.75.75 0 000-1.5H7.75z"></path></svg>
                    </ToolbarButton>
                    <ToolbarButton onClick={handleLink} title="Link">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.665l3-3z"></path><path d="M8.603 16.103a4 4 0 005.657-5.657l-1.224-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a2.5 2.5 0 01-3.536-3.536l3-3a2.5 2.5 0 013.536 3.536.75.75 0 001.061-1.06l-3-3a4 4 0 00-5.657 5.657l3 3a4 4 0 005.657 0z"></path></svg>
                    </ToolbarButton>
                    <div className="w-px h-5 bg-gray-600 mx-1"></div>
                     <ToolbarButton onClick={() => handleCommand('justifyLeft')} title="Align Left">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 9.75A.75.75 0 012.75 9h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 9.75zM2.75 14a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H2.75z" clipRule="evenodd" /></svg>
                    </ToolbarButton>
                     <ToolbarButton onClick={() => handleCommand('justifyCenter')} title="Align Center">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 9.75A.75.75 0 012.75 9h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 9.75zM5.25 14a.75.75 0 000 1.5h9.5a.75.75 0 000-1.5h-9.5z" clipRule="evenodd" /></svg>
                    </ToolbarButton>
                     <ToolbarButton onClick={() => handleCommand('justifyRight')} title="Align Right">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 9.75A.75.75 0 012.75 9h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 9.75zM2.75 14a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H2.75z" clipRule="evenodd" transform="translate(20, 18.5) scale(-1, 1) translate(-20, -18.5)"/></svg>
                    </ToolbarButton>
                     <div className="w-px h-5 bg-gray-600 mx-1"></div>
                      <ToolbarButton onClick={() => colorInputRef.current?.click()} title="Text Color">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.28 5.22a.75.75 0 010 1.06L2.56 10l3.72 3.72a.75.75 0 01-1.06 1.06L.97 10.53a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0zm7.44 0a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 010-1.06zM11.378 2.47a.75.75 0 01.656 1.306l-4 12a.75.75 0 01-1.308-.656l4-12a.75.75 0 01.652-.65z" clipRule="evenodd" /></svg>
                        <input type="color" ref={colorInputRef} onChange={handleColorChange} className="absolute w-0 h-0 opacity-0" />
                    </ToolbarButton>
                </div>
            )}
            <Tag
                ref={fieldRef}
                contentEditable
                suppressContentEditableWarning
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`${className} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary rounded-sm rich-text-field`}
                style={style}
                dangerouslySetInnerHTML={{ __html: value || '' }}
            />
        </div>
    );
};

export default RichEditableField;