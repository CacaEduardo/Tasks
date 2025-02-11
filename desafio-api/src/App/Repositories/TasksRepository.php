<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Database;
use PDO;

class TasksRepository
{

    private $dbname = "desafio_db";
    private $tablename= "tasks";

    public function __construct(private Database $database) {}

    public function getAll(): array
    {
        $pdo = $this->database->getConnection();
        $sql = "SELECT * FROM {$this->dbname}.{$this->tablename}";

        $pdo = $this->database->getConnection();
        $stmt = $pdo->prepare($sql);
        $stmt->execute();

        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $res;
    }

    public function getById(int $id): array|bool
    {
        $sql = "SELECT * 
                FROM {$this->dbname}.{$this->tablename}
                WHERE id = :id ";

        $pdo = $this->database->getConnection();

        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create(array $data): string
    {
        $columns = array_keys($data);
    
        $columnString = implode(", ", $columns);
        $placeholderString = ":" . implode(", :", $columns);
        
        $sql = "INSERT INTO {$this->dbname}.{$this->tablename} ($columnString) VALUES ($placeholderString)";
        
        $pdo = $this->database->getConnection();
        $stmt = $pdo->prepare($sql);

        foreach ($data as $key => $value) {
            $stmt->bindValue(":$key", $value);
        }

        $stmt->execute();
        
        return $pdo->lastInsertId();
    }

    public function update(int $id, array $data): bool
    {
        $sql = "UPDATE {$this->dbname}.{$this->tablename} SET ";

        $setClauses = [];
        $params = [];

        foreach ($data as $column => $value) {
            $setClauses[] = "$column = :$column";
            $params[$column] = $value;
        }

        $sql .= implode(", ", $setClauses);
        $sql .= " WHERE id = :id";

        $pdo = $this->database->getConnection();
        $stmt = $pdo->prepare($sql);

        foreach ($params as $key => $value) {
            $stmt->bindValue(":$key", $value);
        }

        $stmt->bindValue(":id", $id, PDO::PARAM_INT);

        return $stmt->execute();

    }

    public function delete(string $id): bool
    {
        $sql = "DELETE FROM {$this->dbname}.{$this->tablename}
                WHERE id = :id";

        $pdo = $this->database->getConnection();
        $stmt = $pdo->prepare($sql);

        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        return $stmt->execute();
    }
}