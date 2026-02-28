export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      challenge_history: {
        Row: {
          challenge_id: number | null
          created_at: string
          end_date: string | null
          group_id: number | null
          id: number
        }
        Insert: {
          challenge_id?: number | null
          created_at?: string
          end_date?: string | null
          group_id?: number | null
          id?: number
        }
        Update: {
          challenge_id?: number | null
          created_at?: string
          end_date?: string | null
          group_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "challenge_history_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "challenge_history_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      challenges: {
        Row: {
          created_at: string
          description: string | null
          id: number
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          title?: string
        }
        Relationships: []
      }
      groups: {
        Row: {
          challenge_rotation_datetime: string | null
          created_at: string
          id: number
          join_id: string
          name: string | null
          owner_user_id: number | null
        }
        Insert: {
          challenge_rotation_datetime?: string | null
          created_at?: string
          id?: number
          join_id?: string
          name?: string | null
          owner_user_id?: number | null
        }
        Update: {
          challenge_rotation_datetime?: string | null
          created_at?: string
          id?: number
          join_id?: string
          name?: string | null
          owner_user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "groups_owner_user_id_fkey"
            columns: ["owner_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          challenge_id: number | null
          created_at: string
          group_id: number | null
          id: number
          source: string
          type: Database["public"]["Enums"]["post_type"] | null
          user_id: number | null
        }
        Insert: {
          challenge_id?: number | null
          created_at?: string
          group_id?: number | null
          id?: number
          source: string
          type?: Database["public"]["Enums"]["post_type"] | null
          user_id?: number | null
        }
        Update: {
          challenge_id?: number | null
          created_at?: string
          group_id?: number | null
          id?: number
          source?: string
          type?: Database["public"]["Enums"]["post_type"] | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      rating: {
        Row: {
          created_at: string
          id: number
          post_id: number
          rating: Database["public"]["Enums"]["post_rating"]
          user_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          post_id: number
          rating: Database["public"]["Enums"]["post_rating"]
          user_id: number
        }
        Update: {
          created_at?: string
          id?: number
          post_id?: number
          rating?: Database["public"]["Enums"]["post_rating"]
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "rating_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rating_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          auth_id: string | null
          avatar_url: string | null
          created_at: string
          email: string
          group_id: number | null
          id: number
          name: string
        }
        Insert: {
          auth_id?: string | null
          avatar_url?: string | null
          created_at?: string
          email: string
          group_id?: number | null
          id?: number
          name: string
        }
        Update: {
          auth_id?: string | null
          avatar_url?: string | null
          created_at?: string
          email?: string
          group_id?: number | null
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_group_members_by_join_id: {
        Args: { p_join_id: string }
        Returns: {
          avatar_url: string
          group_id: number
          group_name: string
          is_group_owner: boolean
          user_id: number
          user_name: string
        }[]
      }
      get_my_group: {
        Args: never
        Returns: {
          challenge_rotation_datetime: string
          id: number
          join_id: string
          name: string
        }[]
      }
      get_my_group_members: {
        Args: never
        Returns: {
          avatar_url: string
          email: string
          name: string
        }[]
      }
      get_my_group_v2: {
        Args: never
        Returns: {
          challenge_rotation_datetime: string
          id: number
          join_id: string
          name: string
          owner_user_id: number
        }[]
      }
    }
    Enums: {
      post_rating: "like" | "unclear"
      post_type: "image" | "video"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      post_rating: ["like", "unclear"],
      post_type: ["image", "video"],
    },
  },
} as const
