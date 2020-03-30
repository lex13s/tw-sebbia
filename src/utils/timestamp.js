const options = {month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'};

const formatTimestamp = (timestamp) => timestamp.toLocaleString('ru-RU', options);

export default formatTimestamp;