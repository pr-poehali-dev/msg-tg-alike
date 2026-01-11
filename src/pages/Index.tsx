import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  encrypted: boolean;
}

interface Message {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
  status: 'sent' | 'delivered' | 'read';
}

const MOCK_CHATS: Chat[] = [
  {
    id: 1,
    name: 'Анна Петрова',
    avatar: 'AP',
    lastMessage: 'Привет! Как дела? Давно не виделись',
    time: '14:32',
    unread: 3,
    online: true,
    encrypted: true
  },
  {
    id: 2,
    name: 'Команда проекта',
    avatar: 'КП',
    lastMessage: 'Отличная работа! Продолжаем в том же духе',
    time: '12:15',
    unread: 0,
    online: false,
    encrypted: true
  },
  {
    id: 3,
    name: 'Михаил Иванов',
    avatar: 'МИ',
    lastMessage: 'Отправил файлы по проекту',
    time: 'вчера',
    unread: 1,
    online: false,
    encrypted: true
  },
  {
    id: 4,
    name: 'Мария Смирнова',
    avatar: 'МС',
    lastMessage: 'Созвонимся завтра?',
    time: 'вчера',
    unread: 0,
    online: true,
    encrypted: true
  },
  {
    id: 5,
    name: 'Друзья',
    avatar: 'Д',
    lastMessage: 'Кто идет на встречу в субботу?',
    time: '2 дня',
    unread: 5,
    online: false,
    encrypted: true
  }
];

const MOCK_MESSAGES: Message[] = [
  {
    id: 1,
    text: 'Привет! Как дела?',
    time: '14:28',
    isMine: false,
    status: 'read'
  },
  {
    id: 2,
    text: 'Давно не виделись, как проекты?',
    time: '14:29',
    isMine: false,
    status: 'read'
  },
  {
    id: 3,
    text: 'Привет! Все отлично, работаю над новым проектом',
    time: '14:30',
    isMine: true,
    status: 'read'
  },
  {
    id: 4,
    text: 'Очень интересно, расскажешь подробнее?',
    time: '14:31',
    isMine: false,
    status: 'read'
  },
  {
    id: 5,
    text: 'Конечно! Это мессенджер с современным дизайном и шифрованием',
    time: '14:32',
    isMine: true,
    status: 'delivered'
  }
];

function Index() {
  const [selectedChat, setSelectedChat] = useState<Chat>(MOCK_CHATS[0]);
  const [messages] = useState<Message[]>(MOCK_MESSAGES);
  const [messageText, setMessageText] = useState('');
  const [activeTab, setActiveTab] = useState<'chats' | 'contacts' | 'settings'>('chats');

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Sidebar */}
      <div className="w-20 bg-gradient-to-b from-purple-900 to-purple-950 flex flex-col items-center py-6 space-y-6 animate-slide-in-left">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
          M
        </div>
        
        <div className="flex-1 flex flex-col space-y-4">
          <Button
            variant={activeTab === 'chats' ? 'default' : 'ghost'}
            size="icon"
            className={`rounded-2xl transition-all ${
              activeTab === 'chats' 
                ? 'bg-purple-600 hover:bg-purple-700' 
                : 'text-purple-300 hover:text-white hover:bg-purple-800'
            }`}
            onClick={() => setActiveTab('chats')}
          >
            <Icon name="MessageCircle" size={24} />
          </Button>
          
          <Button
            variant={activeTab === 'contacts' ? 'default' : 'ghost'}
            size="icon"
            className={`rounded-2xl transition-all ${
              activeTab === 'contacts' 
                ? 'bg-purple-600 hover:bg-purple-700' 
                : 'text-purple-300 hover:text-white hover:bg-purple-800'
            }`}
            onClick={() => setActiveTab('contacts')}
          >
            <Icon name="Users" size={24} />
          </Button>
          
          <Button
            variant={activeTab === 'settings' ? 'default' : 'ghost'}
            size="icon"
            className={`rounded-2xl transition-all ${
              activeTab === 'settings' 
                ? 'bg-purple-600 hover:bg-purple-700' 
                : 'text-purple-300 hover:text-white hover:bg-purple-800'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            <Icon name="Settings" size={24} />
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="rounded-2xl text-purple-300 hover:text-white hover:bg-purple-800"
        >
          <Icon name="LogOut" size={24} />
        </Button>
      </div>

      {/* Chat List */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col animate-fade-in">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Чаты
            </h1>
            <Button size="icon" variant="ghost" className="rounded-full hover:bg-purple-100">
              <Icon name="Plus" size={20} />
            </Button>
          </div>
          
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Поиск сообщений..."
              className="pl-10 rounded-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-1 p-2">
            {MOCK_CHATS.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all hover:bg-purple-50 ${
                  selectedChat.id === chat.id ? 'bg-gradient-to-r from-purple-100 to-pink-100' : ''
                }`}
              >
                <div className="relative">
                  <Avatar className="w-14 h-14 ring-2 ring-white">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
                      {chat.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 truncate">{chat.name}</span>
                      {chat.encrypted && (
                        <Icon name="Lock" size={14} className="text-green-500 flex-shrink-0" />
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <Badge className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-white animate-scale-in">
        {/* Chat Header */}
        <div className="h-20 bg-gradient-to-r from-purple-600 to-pink-600 px-6 flex items-center justify-between text-white shadow-lg">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12 ring-2 ring-white/50">
              <AvatarImage src="" />
              <AvatarFallback className="bg-white/20 text-white font-semibold">
                {selectedChat.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-lg">{selectedChat.name}</h2>
              <div className="flex items-center gap-2 text-sm text-white/80">
                {selectedChat.online ? (
                  <>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>онлайн</span>
                  </>
                ) : (
                  <span>был(а) недавно</span>
                )}
                {selectedChat.encrypted && (
                  <>
                    <span>•</span>
                    <Icon name="Shield" size={14} />
                    <span>шифрование</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="text-white hover:bg-white/20 rounded-full">
              <Icon name="Phone" size={20} />
            </Button>
            <Button size="icon" variant="ghost" className="text-white hover:bg-white/20 rounded-full">
              <Icon name="Video" size={20} />
            </Button>
            <Button size="icon" variant="ghost" className="text-white hover:bg-white/20 rounded-full">
              <Icon name="MoreVertical" size={20} />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6 bg-gradient-to-br from-purple-50/30 to-pink-50/30">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.isMine ? 'justify-end' : 'justify-start'} animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`max-w-md px-5 py-3 rounded-3xl shadow-sm ${
                    message.isMine
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-md'
                      : 'bg-white text-gray-900 rounded-bl-md'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <div className={`flex items-center gap-1 justify-end mt-1 ${
                    message.isMine ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    <span className="text-xs">{message.time}</span>
                    {message.isMine && (
                      <Icon 
                        name={message.status === 'read' ? 'CheckCheck' : 'Check'} 
                        size={14}
                        className={message.status === 'read' ? 'text-green-300' : ''}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center gap-3 max-w-4xl mx-auto">
            <Button size="icon" variant="ghost" className="rounded-full hover:bg-purple-100 text-purple-600">
              <Icon name="Plus" size={22} />
            </Button>
            
            <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-gray-200">
                <Icon name="Smile" size={20} className="text-gray-600" />
              </Button>
              
              <Input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Написать сообщение..."
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-2"
              />
              
              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-gray-200">
                <Icon name="Paperclip" size={18} className="text-gray-600" />
              </Button>
            </div>
            
            <Button 
              size="icon" 
              className="rounded-full w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
            >
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
