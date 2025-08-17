
import React from 'react';

interface EditableFieldProps {
    isAdmin: boolean;
    value: string;
    onChange: (newValue: string) => void;
    as: 'h1' | 'h2' | 'h3' | 'p' | 'span';
    className?: string;
    rows?: number;
    style?: React.CSSProperties;
}

const EditableField: React.FC<EditableFieldProps> = ({ isAdmin, value, onChange, as, className, rows = 2, style }) => {
    const commonClasses = "bg-blue-50/50 focus:outline-none focus:ring-2 focus:ring-primary rounded-md p-1 -m-1 focus:bg-white";

    if (isAdmin) {
        return (
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`${className} ${commonClasses} resize-none w-full block`}
                rows={rows}
                aria-label={`Edit ${as}`}
                style={style}
            />
        );
    }
    
    const Tag = as;
    return <Tag className={className} style={style}>{value}</Tag>;
};

export default EditableField;