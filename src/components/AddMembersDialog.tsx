import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Contact {
  id: number;
  name: string;
  avatar: string;
  username: string;
  online: boolean;
}

interface AddMembersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupName?: string;
}

const MOCK_CONTACTS: Contact[] = [
  {
    id: 1,
    name: 'Анна Петрова',
    avatar: 'AP',
    username: '@anna_p',
    online: true
  },
  {
    id: 2,
    name: 'Михаил Иванов',
    avatar: 'МИ',
    username: '@mikhail_i',
    online: false
  },
  {
    id: 3,
    name: 'Мария Смирнова',
    avatar: 'МС',
    username: '@maria_s',
    online: true
  },
  {
    id: 4,
    name: 'Александр Козлов',
    avatar: 'АК',
    username: '@alex_k',
    online: false
  },
  {
    id: 5,
    name: 'Елена Новикова',
    avatar: 'ЕН',
    username: '@elena_n',
    online: true
  },
  {
    id: 6,
    name: 'Дмитрий Соколов',
    avatar: 'ДС',
    username: '@dmitry_s',
    online: false
  },
  {
    id: 7,
    name: 'Ольга Морозова',
    avatar: 'ОМ',
    username: '@olga_m',
    online: true
  },
  {
    id: 8,
    name: 'Сергей Волков',
    avatar: 'СВ',
    username: '@sergey_v',
    online: false
  }
];

export function AddMembersDialog({ open, onOpenChange, groupName }: AddMembersDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);

  const filteredContacts = MOCK_CONTACTS.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleContact = (contactId: number) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId)
        ? prev.filter((id) => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleAddMembers = () => {
    onOpenChange(false);
    setSelectedContacts([]);
    setSearchQuery('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Добавить участников
          </DialogTitle>
          <DialogDescription>
            {groupName ? `Добавьте участников в группу "${groupName}"` : 'Выберите контакты для добавления'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Поиск контактов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          {selectedContacts.length > 0 && (
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-purple-900">
                  Выбрано: {selectedContacts.length}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedContacts([])}
                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-100 h-8"
                >
                  Очистить
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedContacts.map((contactId) => {
                  const contact = MOCK_CONTACTS.find((c) => c.id === contactId);
                  if (!contact) return null;
                  return (
                    <Badge
                      key={contactId}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white pl-1 pr-2 py-1 gap-1"
                    >
                      <Avatar className="w-5 h-5">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-white/30 text-white text-xs">
                          {contact.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs">{contact.name}</span>
                      <button
                        onClick={() => toggleContact(contactId)}
                        className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-2">
              {filteredContacts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Icon name="Users" size={48} className="mx-auto mb-3 text-gray-300" />
                  <p>Контакты не найдены</p>
                </div>
              ) : (
                filteredContacts.map((contact) => {
                  const isSelected = selectedContacts.includes(contact.id);
                  return (
                    <div
                      key={contact.id}
                      onClick={() => toggleContact(contact.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300'
                          : 'hover:bg-gray-50 border-2 border-transparent'
                      }`}
                    >
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
                            {contact.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900">{contact.name}</p>
                        <p className="text-sm text-gray-600">{contact.username}</p>
                      </div>

                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-purple-600'
                            : 'border-gray-300'
                        }`}
                      >
                        {isSelected && <Icon name="Check" size={14} className="text-white" />}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </ScrollArea>

          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                setSelectedContacts([]);
                setSearchQuery('');
              }}
              className="flex-1 h-12"
            >
              Отмена
            </Button>
            <Button
              onClick={handleAddMembers}
              disabled={selectedContacts.length === 0}
              className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Icon name="UserPlus" size={18} className="mr-2" />
              Добавить ({selectedContacts.length})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
