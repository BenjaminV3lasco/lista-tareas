import { useMemo } from 'react';

export const useMemberNames = (members, users) => {
  // Función para obtener el nombre de un usuario
  const getUserName = (user) => {
    return user 
      ? (user.username || user.fullName || user.email || 'Usuario sin nombre')
      : null;
  };

  // Función para obtener los nombres de los miembros
  const getMemberNames = useMemo(() => {
    // Validaciones iniciales
    if (!members || !users || !Array.isArray(users)) return 'Sin miembros';

    // Convertir a array si es un solo ID
    const memberArray = Array.isArray(members) ? members : [members];
    
    // Buscar y mapear nombres de usuarios
    const memberNames = memberArray
      .map(memberId => {
        const user = users.find(
          user => user.id === memberId || user._id === memberId
        );
        return getUserName(user);
      })
      .filter(name => name !== null)
      .join(', ');
    
    return memberNames || 'Sin miembros';
  }, [members, users]);

  // Función de depuración opcional
  const debugData = () => {
    console.log('Members:', members);
    console.log('Users:', users);
  };

  return {
    memberNames: getMemberNames,
    debugData
  };
};