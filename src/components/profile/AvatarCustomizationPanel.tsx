
import React from 'react';
import { Palette, User, Sparkles, Star, Heart } from 'lucide-react';

interface AvatarCustomizationPanelProps {
  selectedAvatar: {
    style: string;
    color: string;
    icon: string;
  };
  onAvatarUpdate: (avatar: any) => void;
}

const AvatarCustomizationPanel = ({ selectedAvatar, onAvatarUpdate }: AvatarCustomizationPanelProps) => {
  const avatarStyles = [
    { id: 'gradient', name: 'Gradient', preview: 'bg-gradient-to-br from-purple-500 to-blue-500' },
    { id: 'solid', name: 'Solid', preview: 'bg-purple-500' },
    { id: 'pattern', name: 'Pattern', preview: 'bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500' }
  ];

  const avatarColors = [
    { id: 'purple-blue', name: 'Purple Blue', class: 'from-purple-500 to-blue-500' },
    { id: 'pink-orange', name: 'Pink Orange', class: 'from-pink-500 to-orange-500' },
    { id: 'green-teal', name: 'Green Teal', class: 'from-green-500 to-teal-500' },
    { id: 'red-pink', name: 'Red Pink', class: 'from-red-500 to-pink-500' },
    { id: 'blue-purple', name: 'Blue Purple', class: 'from-blue-500 to-purple-500' },
    { id: 'yellow-red', name: 'Yellow Red', class: 'from-yellow-500 to-red-500' }
  ];

  const avatarIcons = [
    { id: 'A', icon: 'A', name: 'Letter' },
    { id: 'user', icon: User, name: 'User' },
    { id: 'sparkles', icon: Sparkles, name: 'Sparkles' },
    { id: 'star', icon: Star, name: 'Star' },
    { id: 'heart', icon: Heart, name: 'Heart' }
  ];

  const getAvatarClass = () => {
    const color = avatarColors.find(c => c.id === selectedAvatar.color);
    if (selectedAvatar.style === 'gradient') {
      return `bg-gradient-to-br ${color?.class}`;
    } else if (selectedAvatar.style === 'pattern') {
      return `bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500`;
    }
    return 'bg-purple-500';
  };

  const renderAvatarIcon = () => {
    const iconData = avatarIcons.find(i => i.id === selectedAvatar.icon);
    if (iconData?.id === 'A') {
      return <span className="text-2xl text-white font-bold">A</span>;
    }
    const IconComponent = iconData?.icon as any;
    return <IconComponent size={24} className="text-white" />;
  };

  return (
    <div className="space-y-6 mt-6 max-h-[70vh] overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <Palette size={18} className="text-purple-500" />
        <h3 className="font-semibold">Customize Avatar</h3>
      </div>
      
      {/* Avatar Preview */}
      <div className="text-center p-4 glass-card-secondary rounded-xl">
        <div className={`w-20 h-20 rounded-full ${getAvatarClass()} flex items-center justify-center mx-auto mb-3 transition-all duration-300`}>
          {renderAvatarIcon()}
        </div>
        <p className="text-sm text-muted-foreground">Preview</p>
      </div>
      
      {/* Style Selection */}
      <div>
        <p className="text-sm font-medium mb-3">Style</p>
        <div className="grid grid-cols-3 gap-2">
          {avatarStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => onAvatarUpdate({...selectedAvatar, style: style.id})}
              className={`p-3 rounded-xl text-xs font-medium transition-all duration-200 ${
                selectedAvatar.style === style.id 
                  ? 'glass-card-secondary scale-105 ring-2 ring-purple-500' 
                  : 'glass-card hover:glass-card-secondary hover:scale-105'
              }`}
            >
              {style.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Color Selection */}
      <div>
        <p className="text-sm font-medium mb-3">Color</p>
        <div className="grid grid-cols-3 gap-3">
          {avatarColors.map((color) => (
            <button
              key={color.id}
              onClick={() => onAvatarUpdate({...selectedAvatar, color: color.id})}
              className={`aspect-square rounded-xl bg-gradient-to-br ${color.class} border-2 transition-all duration-200 ${
                selectedAvatar.color === color.id 
                  ? 'border-white scale-110 shadow-lg ring-2 ring-purple-500' 
                  : 'border-transparent hover:scale-105'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Icon Selection */}
      <div>
        <p className="text-sm font-medium mb-3">Icon</p>
        <div className="grid grid-cols-5 gap-2">
          {avatarIcons.map((icon) => (
            <button
              key={icon.id}
              onClick={() => onAvatarUpdate({...selectedAvatar, icon: icon.id})}
              className={`aspect-square rounded-xl glass-card flex items-center justify-center transition-all duration-200 ${
                selectedAvatar.icon === icon.id 
                  ? 'glass-card-secondary scale-105 ring-2 ring-purple-500' 
                  : 'hover:glass-card-secondary hover:scale-105'
              }`}
            >
              {icon.id === 'A' ? (
                <span className="text-sm font-bold">A</span>
              ) : (
                React.createElement(icon.icon, { size: 16 })
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvatarCustomizationPanel;
