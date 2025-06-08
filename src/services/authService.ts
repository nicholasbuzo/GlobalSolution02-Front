export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  photo: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  address: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Funções mockadas para simular a API
// TODO: Implementar chamadas reais à API

export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
  // Simulando uma chamada à API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: '1',
          name: 'Usuário Teste',
          email: credentials.email,
          address: 'Endereço Teste',
          photo: '/default-avatar.png'
        },
        token: 'mock-token'
      });
    }, 1000);
  });
}

export async function registerUser(data: RegisterData): Promise<AuthResponse> {
  // Simulando uma chamada à API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: '1',
          name: data.name,
          email: data.email,
          address: data.address,
          photo: '/default-avatar.png'
        },
        token: 'mock-token'
      });
    }, 1000);
  });
}

export async function updateUserProfile(userId: string, data: Partial<User>): Promise<User> {
  // Simulando uma chamada à API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: data.name || 'Usuário Teste',
        email: data.email || 'teste@email.com',
        address: data.address || 'Endereço Teste',
        photo: data.photo || '/default-avatar.png'
      });
    }, 1000);
  });
} 