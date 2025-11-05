import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { registerSchema } from '@/lib/validations';
import { UserRole } from '@/types/user.types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validation avec Zod
    const validatedData = registerSchema.parse(body);

    await connectDB();

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email: validatedData.email });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Cet email est déjà utilisé' },
        { status: 400 }
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Créer l'utilisateur
    const user = await User.create({
      email: validatedData.email,
      name: validatedData.name,
      password: hashedPassword,
      phone: validatedData.phone,
      role: UserRole.CLIENT, // Par défaut, nouveau utilisateur = CLIENT
    });

    // Retourner l'utilisateur sans le mot de passe
    const userResponse = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
      createdAt: user.createdAt
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Compte créé avec succès',
        data: userResponse
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Register error:', error);

    // Erreur de validation Zod
    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          error: 'Données invalides',
          details: error.errors
        },
        { status: 400 }
      );
    }

    // Erreur Mongoose (duplication, etc.)
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Cet email est déjà utilisé' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la création du compte'
      },
      { status: 500 }
    );
  }
}
