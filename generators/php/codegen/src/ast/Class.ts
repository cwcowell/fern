import { AstNode } from "./core/AstNode";
import { Writer } from "./core/Writer";
import { CodeBlock } from "./CodeBlock";
import { Parameter } from "./Parameter";
import { Access } from "./Access";
import { Field } from "./Field";
import { Method } from "./Method";
import { Comment } from "./Comment";
import { orderByAccess } from "./utils/orderByAccess";

export declare namespace Class {
    interface Args {
        /* The name of the PHP# class */
        name: string;
        /* The namespace of the PHP class */
        namespace: string;
        /* Defaults to false */
        abstract?: boolean;
        /* Docs associated with the class */
        docs?: string;
        /* The class to inherit from if any */
        parentClassReference?: AstNode;
    }

    interface Constructor {
        /* The parameters of the constructor */
        parameters: Parameter[];
        /* The access of the constructor */
        access?: Access;
        /* The body of the constructor */
        body?: CodeBlock;
    }
}

export class Class extends AstNode {
    public readonly name: string;
    public readonly namespace: string;
    public readonly abstract: boolean;
    public readonly docs: string | undefined;
    public readonly parentClassReference: AstNode | undefined;

    public readonly fields: Field[] = [];
    public readonly methods: Method[] = [];
    private constructor_: Class.Constructor | undefined;

    constructor({ name, namespace, abstract, docs, parentClassReference }: Class.Args) {
        super();
        this.name = name;
        this.namespace = namespace;
        this.abstract = abstract ?? false;
        this.docs = docs;
        this.parentClassReference = parentClassReference;
    }

    public addConstructor(constructor: Class.Constructor): void {
        this.constructor_ = constructor;
    }

    public addField(field: Field): void {
        this.fields.push(field);
    }

    public addMethod(method: Method): void {
        this.methods.push(method);
    }

    public write(writer: Writer): void {
        if (this.abstract) {
            writer.write("abstract ");
        }
        this.writeComment(writer);
        writer.writeLine(`class ${this.name} `);
        if (this.parentClassReference != null) {
            writer.write("extends ");
            this.parentClassReference.write(writer);
        }
        writer.writeLine("{");
        writer.indent();

        this.writeFields({ writer, fields: orderByAccess(this.fields) });
        if (this.constructor != null || this.methods.length > 0) {
            writer.newLine();
        }

        if (this.constructor_ != null) {
            this.writeConstructor({ writer, constructor: this.constructor_ });
            if (this.methods.length > 0) {
                writer.newLine();
            }
        }

        this.writeMethods({ writer, methods: orderByAccess(this.methods) });

        writer.dedent();
        writer.writeLine("}");
        return;
    }

    private writeComment(writer: Writer): void {
        if (this.docs == null) {
            return undefined;
        }
        const comment = new Comment({ docs: this.docs });
        comment.write(writer);
    }

    private writeConstructor({ writer, constructor }: { writer: Writer; constructor: Class.Constructor }): void {
        this.writeConstructorComment({ writer, constructor });
        if (constructor.access != null) {
            writer.write(`${constructor.access} `);
        }
        writer.write("function __construct(");
        writer.indent();
        constructor.parameters.forEach((parameter, index) => {
            if (index === 0) {
                writer.newLine();
            }
            parameter.write(writer);
            writer.writeLine(",");
        });
        writer.dedent();
        writer.writeLine(")");
        writer.writeLine("{");
        writer.indent();
        constructor.body?.write(writer);
        writer.writeNewLineIfLastLineNot();
        writer.dedent();
        writer.writeLine("}");
    }

    private writeConstructorComment({ writer, constructor }: { writer: Writer; constructor: Class.Constructor }): void {
        if (constructor.parameters.length === 0) {
            return;
        }
        const comment = new Comment();
        for (const parameter of constructor.parameters) {
            comment.addTag(parameter.getCommentTag());
        }
        comment.write(writer);
    }

    private writeFields({ writer, fields }: { writer: Writer; fields: Field[] }): void {
        fields.forEach((field, index) => {
            if (index > 0) {
                writer.newLine();
            }
            field.write(writer);
            writer.writeNewLineIfLastLineNot();
        });
    }

    private writeMethods({ writer, methods }: { writer: Writer; methods: Method[] }): void {
        methods.forEach((method, index) => {
            if (index > 0) {
                writer.newLine();
            }
            method.write(writer);
            writer.writeNewLineIfLastLineNot();
        });
    }
}
